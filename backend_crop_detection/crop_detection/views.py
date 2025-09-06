import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
# import tensorflow as tf
# from tensorflow.keras.models import load_model
import tensorflow as tf
from datetime import datetime, timedelta
import random
from django.core.files.storage import default_storage
import numpy as np
from PIL import Image
import io
from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth.models import User
from rest_framework.response import Response
from .models import ImageUpload, Feedback, CropDisease, ForumPost, ForumComment, FAQ, ContactMessage
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.exceptions import ValidationError
from .genai_insights import get_disease_insight
import google.generativeai as genai
from tensorflow.keras.models import load_model
from .serializers import (
    ImageUploadSerializer, FeedbackSerializer, CropDiseaseSerializer,
    ForumPostSerializer, ForumCommentSerializer, FAQSerializer, ContactMessageSerializer, UserSerializer
)

Model_Path = os.path.join(os.path.dirname(__file__), 'Models', 'crop_disease_detector_model.keras')
# model = load_model(Model_Path)
model = load_model(Model_Path)

CLASS_NAMES =  ['Bacterial_spot', 'Cassava bacterial blight', 'Cassava brown spot', 'Cassava green mite', 'Cassava healthy', 'Cassava mosaic', 'Common Rust', 'Early_blight', 'Gray Leaf Spot', 'Healthy', 'Late_blight', 'Leaf_Mold', 'Northern Leaf Blight', 'Not_crop_leaf', 'Septoria_leaf_spot', 'Spider_mites Two-spotted_spider_mite', 'Target_Spot', 'Tomato_Yellow_Leaf_Curl_Virus', 'Tomato_mosaic_virus', 'als', 'bean_rust', 'healthy', 'powdery_mildew']




class ImageUploadView(generics.CreateAPIView):
    queryset = ImageUpload.objects.all()
    serializer_class = ImageUploadSerializer
    permission_classes = [AllowAny]
    parser_classes = (MultiPartParser, FormParser)  # Ensure proper file handling

    def perform_create(self, serializer):
        uploaded_image = self.request.FILES.get('image')

        if not uploaded_image:
            raise ValidationError({"error": "No image uploaded"})

        try:
            # Open and preprocess the image
            image = Image.open(uploaded_image)
            image = image.resize((160, 160))  # Resize to match model input size
            image_array = np.array(image)   # Normalize pixel values
            image_array = np.expand_dims(image_array, axis=0)  # Add batch dimension

            # Make a prediction
            prediction = model.predict(image_array)
            predicted_class = CLASS_NAMES[np.argmax(prediction)]
            confidence = float(np.max(prediction))
            
            ai_insights = get_disease_insight(predicted_class)

            # Save the uploaded image and result
            serializer.save(user=self.request.user if self.request.user.is_authenticated else None,
                            image=uploaded_image, result=predicted_class, confidence=confidence, ai_insights=ai_insights)

        except Exception as e:
            raise ValidationError({"error": str(e)})








# Model Performance Feedback View/End Point
class FeedbackView(generics.ListCreateAPIView):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer
    permission_classes = [permissions.IsAuthenticated]

# Crop Health Information & Remedies View/End Point
class CropDiseaseView(generics.ListAPIView):
    queryset = CropDisease.objects.all()
    serializer_class = CropDiseaseSerializer

# History & Results Tracking View/End Point
class UserHistoryView(generics.ListAPIView):
    serializer_class = ImageUploadSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return ImageUpload.objects.filter(user=self.request.user)

class HomeResultsView(generics.ListAPIView):
    queryset = ImageUpload.objects.all().order_by('-timestamp')[:10]
    serializer_class = ImageUploadSerializer
    permission_classes = [AllowAny]



# Help & Support View/End Point
class FAQView(generics.ListAPIView):
    queryset = FAQ.objects.all()
    serializer_class = FAQSerializer

class ContactMessageView(generics.CreateAPIView):
    serializer_class = ContactMessageSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    
    
class ForumPostListCreateView(generics.ListCreateAPIView):
    queryset = ForumPost.objects.all().order_by("-timestamp")
    serializer_class = ForumPostSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)  # Save post with logged-in user

class ForumPostDeleteView(generics.DestroyAPIView):
    queryset = ForumPost.objects.all()
    serializer_class = ForumPostSerializer
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        post = self.get_object()
        if post.user != request.user:
            return Response({"error": "You can only delete your own posts."}, status=status.HTTP_403_FORBIDDEN)
        return super().delete(request, *args, **kwargs)




class ForumCommentCreateView(generics.CreateAPIView):
    serializer_class = ForumCommentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        post_id = self.kwargs["post_id"]
        post = get_object_or_404(ForumPost, id=post_id)
        serializer.save(user=self.request.user, post=post)

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        post = ForumPost.objects.prefetch_related("comments").get(id=self.kwargs["post_id"])
        return Response(ForumCommentSerializer(post.comments, many=True).data, status=status.HTTP_201_CREATED)




class ForumCommentDeleteView(generics.DestroyAPIView):
    queryset = ForumComment.objects.all()
    serializer_class = ForumCommentSerializer
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        comment = self.get_object()
        if comment.user != request.user:
            return Response({"error": "You can only delete your own comments."}, status=status.HTTP_403_FORBIDDEN)
        return super().delete(request, *args, **kwargs)

class LikeDislikeCommentView(generics.UpdateAPIView):
    queryset = ForumComment.objects.all()
    serializer_class = ForumCommentSerializer
    permission_classes = [IsAuthenticated]

    def patch(self, request, *args, **kwargs):
        comment = self.get_object()
        action = request.data.get("action")  # 'like' or 'dislike'

        if action == "like":
            comment.likes += 1
        elif action == "dislike":
            comment.dislikes += 1
        else:
            return Response({"error": "Invalid action"}, status=status.HTTP_400_BAD_REQUEST)

        comment.save()
        return Response({"likes": comment.likes, "dislikes": comment.dislikes})
    
  

genai.configure(api_key="AIzaSyB9IHWHbqggP__-hN9304vrJqTnvTDha3c")  # Replace with your actual API key
qa_pipeline = genai.GenerativeModel("gemini-1.5-flash")

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def voice_query_view(request):
    query = request.data.get("query")
    if not query:
        return Response({"error": "No query provided"}, status=400)

    # Construct prompt
    prompt = (
        f"Extract the crop disease name from the following voice query and provide "
        f"detailed but concise information about its causes, symptoms, treatments, and "
        f"prevention methods in Uganda:\n\n{query}"
    )

    try:
        # Generate content using Gemini
        response = qa_pipeline.generate_content(prompt)
        insight = response.text  # get the generated text

        return Response({
            "query": query,
            "insight": insight,
        })
    except Exception as e:
        return Response({"error": str(e)}, status=500)





@api_view(['POST'])
@permission_classes([IsAuthenticated])
def predict_outbreak(request):
    crop = request.data.get('crop')
    region = request.data.get('region')
    timeframe = request.data.get('timeframe')

    # Ensure consistent results for same input
    seed_input = f"{crop}-{region}-{timeframe}"
    random.seed(seed_input)

    # Simulated prediction logic
    possible_predictions = {
        "maize": ["Fall Armyworm", "Maize Streak Virus", "Maize Common Rust",  "Maize Gray Leaf Spot", "Northern Leaf Blight", "No Threat"],
        "beans": ["Bean Rust", "Root Rot", "Bean als" "No Threat"],
        "cassava": ["Cassava Mosaic Disease", "Bacterial Blight", "Cassava bacterial blight", "Cassava green mite", "Cassava mosaic", "Cassava brown spot", "No Threat"],
        "tomato": ["Tomato Early Blight", "Tomato Late Blight", "Tomato Bacterial_spot" , "Tomato Septoria_leaf_spot", "Tomato_mosaic_virusEarly_blight",  "Tomato Spider_mites Two-spotted_spider_mite", "Tomato Target_Spot ", " Tomato powdery_mildewLeaf_Mold", "Tomato_Yellow_Leaf_Curl_Virus", "No Threat"]
    }

    prediction = random.choice(possible_predictions.get(crop, ["No Data"]))
    confidence = round(random.uniform(0.6, 0.99), 2) if prediction != "No Threat" else round(random.uniform(0.4, 0.7), 2)

    # Simulated historical trend (last 6 months)
    today = datetime.today()
    historical = []
    for i in range(6):
        date = today - timedelta(days=30 * (5 - i))
        value = round(random.uniform(0, 1), 2)
        historical.append({
            "month": date.strftime("%b %Y"),
            "severity": value
        })

    return Response({
        "prediction": prediction,
        "confidence": confidence,
        "historical_trend": historical
    })
