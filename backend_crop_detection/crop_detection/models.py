from django.db import models
from django.contrib.auth.models import User

# Image Upload & Detection
class ImageUpload(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    image = models.ImageField(upload_to='uploads/')
    result = models.CharField(max_length=255)
    confidence = models.FloatField(blank=True, null=True)
    ai_insights = models.TextField(blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.user} - {self.result}"

# Model Performance Feedback
class Feedback(models.Model):
    image = models.OneToOneField(ImageUpload, on_delete=models.CASCADE)
    user_feedback = models.BooleanField(null=True, blank=True)  # True if correct, False if incorrect
    corrected_result = models.CharField(max_length=255, null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

# Crop Health Info & Remedies
class CropDisease(models.Model):
    name = models.CharField(max_length=255, unique=True)
    description = models.TextField()
    causes = models.TextField()
    symptoms = models.TextField()
    remedies = models.TextField()

# Community Forum
# class ForumPost(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     title = models.CharField(max_length=255)
#     content = models.TextField()
#     timestamp = models.DateTimeField(auto_now_add=True)

# class ForumComment(models.Model):
#     post = models.ForeignKey(ForumPost, on_delete=models.CASCADE, related_name="comments")
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     comment = models.TextField()
#     timestamp = models.DateTimeField(auto_now_add=True)


class ForumPost(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class ForumComment(models.Model):
    post = models.ForeignKey(ForumPost, on_delete=models.CASCADE, related_name="comments")
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    comment = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    likes = models.IntegerField(default=0)  # 👍 Like count
    dislikes = models.IntegerField(default=0)  # 👎 Dislike count

    def __str__(self):
        return f"Comment by {self.user.username} on {self.post.title}"



# Help & Support
class FAQ(models.Model):
    question = models.CharField(max_length=255)
    answer = models.TextField()

class ContactMessage(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    email = models.EmailField()
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

