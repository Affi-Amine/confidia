from rest_framework import serializers
from .models import UserSubscription

class UserSubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSubscription
        fields = ['email', 'is_subscribed', 'created_at', 'updated_at']
