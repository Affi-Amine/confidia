from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.http import HttpResponseRedirect
from .models import UserSubscription
from .serializers import UserSubscriptionSerializer
import secrets
import hashlib
from datetime import datetime

class CheckSubscription(APIView):
    def get(self, request):
        email = request.GET.get('email')
        if not email:
            return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Check if the email exists in the database
            subscription = UserSubscription.objects.get(email=email)
            serializer = UserSubscriptionSerializer(subscription)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except UserSubscription.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

# New function-based view for subscribing user and redirecting
def subscribe_user(request):
    email = request.GET.get('email')

    if not email:
        return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)

    # Fetch the user from the database and update the is_subscribed field
    user = get_object_or_404(UserSubscription, email=email)
    user.is_subscribed = True
    user.save()

    # Redirect back to the frontend homelogin page
    return HttpResponseRedirect("http://localhost:3000/homelogin")

# Function to generate a unique token for a user based on the email
def generate_unique_token(email):
    # Create a unique identifier using the current timestamp and the user's email
    unique_string = f"{email}-{datetime.utcnow()}-{secrets.token_hex(16)}"
    
    # Hash the unique identifier to create a fixed-length token
    token = hashlib.sha256(unique_string.encode()).hexdigest()
    
    return token

@api_view(['POST'])
def generate_user_token(request):
    email = request.data.get('email')
    
    if not email:
        return Response({"error": "Email not provided"}, status=status.HTTP_400_BAD_REQUEST)

    # Check if the user already exists
    subscription, created = UserSubscription.objects.get_or_create(
        email=email,
        defaults={'is_subscribed': False}  # Initialize is_subscribed to False
    )

    print(subscription)
    # Generate token if it doesn't exist
    if not subscription.token:  # Change user_token to token
        subscription.token = generate_unique_token(email)  # Generate a unique token
        subscription.save()

    return Response({'access': subscription.token}, status=status.HTTP_200_OK)