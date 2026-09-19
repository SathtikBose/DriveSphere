from django.db import models

class UserProfile(models.Model):
    clerk_user_id = models.CharField(max_length=255, unique=True)
    email = models.EmailField(unique=True, null=True, blank=True)
    first_name = models.CharField(max_length=255, null=True, blank=True)
    last_name = models.CharField(max_length=255, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    @property
    def is_authenticated(self):
        return True
        
    @property
    def is_active(self):
        return True

    def __str__(self):
        return self.email or self.clerk_user_id
