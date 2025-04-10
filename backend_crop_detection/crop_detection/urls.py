from django.urls import path
from .views import (
    ImageUploadView, FeedbackView, CropDiseaseView, UserHistoryView, HomeResultsView,
    FAQView, ContactMessageView, RegisterView,
    ForumPostListCreateView, ForumPostDeleteView, ForumCommentCreateView, 
    ForumCommentDeleteView, LikeDislikeCommentView, #ForumPostView, ForumCommentView,
)
from rest_framework_simplejwt.views import (
    TokenObtainPairView,  # Generates Access & Refresh Tokens
    TokenRefreshView,      # Refreshes Access Token
    TokenVerifyView,       # Verifies if a Token is Valid
)

urlpatterns = [
    path('upload/', ImageUploadView.as_view(), name='image-upload'),
    path('feedback/', FeedbackView.as_view(), name='feedback'),
    path('diseases/', CropDiseaseView.as_view(), name='crop-diseases'),
    path('history/', UserHistoryView.as_view(), name='user-history'),
    path('home/', HomeResultsView.as_view(), name='home-results'),
    path("forum/", ForumPostListCreateView.as_view(), name="forum-list-create"),
    path("forum/<int:pk>/delete/", ForumPostDeleteView.as_view(), name="forum-delete"),
    path("forum/comment/", ForumCommentCreateView.as_view(), name="comment-create"),
    path("forum/<int:post_id>/reply/", ForumCommentCreateView.as_view(), name="forum-reply"),
    path("forum/comment/<int:pk>/delete/", ForumCommentDeleteView.as_view(), name="comment-delete"),
    path("forum/comment/<int:pk>/like-dislike/", LikeDislikeCommentView.as_view(), name="comment-like-dislike"),
    # path('forum/', ForumPostView.as_view(), name='forum-posts'),
    # path('forum/<int:post_id>/comments/', ForumCommentView.as_view(), name='forum-comments'),
    path('faq/', FAQView.as_view(), name='faq'),
    path('contact/', ContactMessageView.as_view(), name='contact-message'),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('verify/', TokenVerifyView.as_view(), name='token_verify'),
]
