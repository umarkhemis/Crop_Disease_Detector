import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
# import tensorflow as tf
# from tensorflow.keras.models import load_model
import tensorflow as tf
from django.core.files.storage import default_storage
import numpy as np
from PIL import Image
import io
from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework import generics, permissions, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth.models import User
from rest_framework.response import Response
from .models import ImageUpload, Feedback, CropDisease, ForumPost, ForumComment, FAQ, ContactMessage
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.exceptions import ValidationError
from .genai_insights import get_disease_insight
from tensorflow.keras.models import load_model
from .serializers import (
    ImageUploadSerializer, FeedbackSerializer, CropDiseaseSerializer,
    ForumPostSerializer, ForumCommentSerializer, FAQSerializer, ContactMessageSerializer, UserSerializer
)

Model_Path = os.path.join(os.path.dirname(__file__), 'Models', 'my_new_model.keras')
# model = load_model(Model_Path)
model = load_model(Model_Path)

CLASS_NAMES =  ['Bacterial_spot', 'Cassava bacterial blight', 'Cassava brown spot', 'Cassava green mite', 'Cassava healthy', 'Cassava mosaic', 'Common Rust', 'Early_blight', 'Gray Leaf Spot', 'Healthy', 'Late_blight', 'Leaf_Mold', 'Northern Leaf Blight', 'Septoria_leaf_spot', 'Spider_mites Two-spotted_spider_mite', 'Target_Spot', 'Tomato_Yellow_Leaf_Curl_Virus', 'Tomato_mosaic_virus', 'als', 'bean_rust', 'healthy', 'powdery_mildew']




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
            image_array = np.array(image) / 255.0  # Normalize pixel values
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






# class ImageUploadView(generics.CreateAPIView):
#     queryset = ImageUpload.objects.all()
#     serializer_class = ImageUploadSerializer
#     permission_classes = [permissions.AllowAny]

#     def perform_create(self, serializer):
#         uploaded_image = self.request.FILES.get("image")

#         if not uploaded_image:
#             return Response({"error": "No image uploaded"}, status=status.HTTP_400_BAD_REQUEST)

#         try:
#             # Save the image temporarily
#             temp_path = default_storage.save("temp_image.jpg", uploaded_image)

#             # Open and preprocess the image
#             image = Image.open(default_storage.path(temp_path))
#             image = image.resize((224, 224))  # Resize to model input size
#             image_array = np.array(image) / 255.0  # Normalize
#             image_array = np.expand_dims(image_array, axis=0)  # Add batch dimension

#             # Predict using the model
#             prediction = model.predict(image_array)
#             predicted_class = CLASS_NAMES[np.argmax(prediction)]
#             confidence = float(np.max(prediction))

#             # Remove the temporary file after processing
#             default_storage.delete(temp_path)

#             # Save the prediction result in the database
#             serializer.save(user=self.request.user if self.request.user.is_authenticated else None, 
#                             result=predicted_class, confidence=confidence)

#         except Exception as e:
#             return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)






# class ImageUploadView(generics.ListCreateAPIView):
#     queryset = ImageUpload.objects.all()
#     serializer_class = ImageUploadSerializer
#     permission_classes = [AllowAny]

#     def perform_create(self, serializer):
#         uploaded_image = self.request.FILES.get('image')

#         if uploaded_image:
#             try:
#                 # Open and preprocess the image
#                 image = Image.open(uploaded_image)
#                 image = image.resize((224, 224))  # Resize to match model input size
#                 image_array = np.array(image) / 255.0  # Normalize pixel values
#                 image_array = np.expand_dims(image_array, axis=0)  # Add batch dimension

#                 # Make a prediction
#                 prediction = model.predict(image_array)
#                 predicted_class = CLASS_NAMES[np.argmax(prediction)]
#                 confidence = float(np.max(prediction))

#                 # Save the uploaded image and result
#                 serializer.save(user=self.request.user, result=predicted_class, confidence=confidence)

#             except Exception as e:
#                 return Response({'error': str(e)}, status=400)
#         else:
#             return Response({'error': 'No image uploaded'}, status=400)


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

# Community Forum View/End Point
# class ForumPostView(generics.ListCreateAPIView):
#     queryset = ForumPost.objects.all().order_by('-timestamp')
#     serializer_class = ForumPostSerializer
#     permission_classes = [permissions.IsAuthenticatedOrReadOnly]

# class ForumCommentView(generics.ListCreateAPIView):
#     serializer_class = ForumCommentSerializer
#     permission_classes = [permissions.IsAuthenticated]

#     def get_queryset(self):
#         return ForumComment.objects.filter(post=self.kwargs['post_id'])

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

# class ForumCommentCreateView(generics.CreateAPIView):
#     queryset = ForumComment.objects.all()
#     serializer_class = ForumCommentSerializer
#     permission_classes = [IsAuthenticated]

#     def perform_create(self, serializer):
#         serializer.save(user=self.request.user)  # Save comment with logged-in user

# class ForumCommentCreateView(generics.CreateAPIView):
#     serializer_class = ForumCommentSerializer
#     permission_classes = [permissions.IsAuthenticated]

#     def perform_create(self, serializer):
#         post_id = self.kwargs["pk"]
#         post = ForumPost.objects.get(pk=post_id)
#         serializer.save(user=self.request.user, post=post)



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




# class ForumCommentCreateView(generics.CreateAPIView):
#     serializer_class = ForumCommentSerializer
#     permission_classes = [IsAuthenticated]

#     def perform_create(self, serializer):
#         post_id = self.kwargs["post_id"]
#         post = get_object_or_404(ForumPost, id=post_id)
#         serializer.save(user=self.request.user, post=post)

#     def create(self, request, *args, **kwargs):
#         response = super().create(request, *args, **kwargs)
#         post = ForumPost.objects.prefetch_related("comments").get(id=self.kwargs["post_id"])
#         return Response(ForumPostSerializer(post).data, status=status.HTTP_201_CREATED)
    
    
    
    # serializer_class = ForumCommentSerializer
    # permission_classes = [permissions.IsAuthenticated]

    # def perform_create(self, serializer):
    #     post_id = self.kwargs["pk"]
    #     try:
    #         post = ForumPost.objects.get(pk=post_id)
    #         serializer.save(user=self.request.user, post=post)  # ✅ Set user & post correctly
    #     except ForumPost.DoesNotExist:
    #         raise serializer.ValidationError({"error": "Forum post not found."})


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