from django.db import models

class UserSubscription(models.Model):
    email = models.EmailField(unique=True)
    is_subscribed = models.BooleanField(default=False)
    token = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.email
