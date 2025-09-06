from rest_framework import serializers
from .models import ImageUpload, Feedback, CropDisease, ForumPost, ForumComment, FAQ, ContactMessage
from django.contrib.auth.models import User

class ImageUploadSerializer(serializers.ModelSerializer):
    result = serializers.CharField(read_only=True)  # Result is automatically set after prediction
    confidence = serializers.FloatField(read_only=True)  # Confidence is also computed
    
    class Meta:
        model = ImageUpload
        fields = ['id', 'user', 'image', 'result', 'confidence', 'timestamp', 'ai_insights']
        
        read_only_field = ['ai_insights']
        
    # class Meta:
    #     model = ImageUpload
    #     fields = ['id', 'user', 'image', 'result', 'confidence', 'timestamp']
    #     fields = ['id', 'user', 'image', 'result', 'confidence', 'timestamp']

class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = '__all__'

class CropDiseaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = CropDisease
        fields = '__all__'

# class ForumPostSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = ForumPost
#         fields = '__all__'

# class ForumCommentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = ForumComment
#         fields = '__all__'

class ForumCommentSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source="user.username")  # Show username instead of ID
     
    
    class Meta:
        model = ForumComment
        fields = ["id", "post", "user", "comment", "timestamp", "likes", "dislikes"]

class ForumPostSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source="user.username")
    comments = ForumCommentSerializer(many=True, read_only=True, )  # Include comments in post details
    replies = ForumCommentSerializer(many=True, read_only=True, source="comments")
    
    class Meta:
        model = ForumPost
        fields = ["id", "user", "title", "content", "timestamp", "comments", "replies"]


class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = '__all__'

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user