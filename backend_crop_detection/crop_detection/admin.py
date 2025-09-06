from django.contrib import admin
from .models import *

admin.site.register(ImageUpload)
admin.site.register(ForumComment)
admin.site.register(ForumPost)
admin.site.register(ContactMessage)
admin.site.register(CropDisease)
admin.site.register(Feedback)
admin.site.register(FAQ)