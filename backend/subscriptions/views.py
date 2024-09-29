from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.http import HttpResponseRedirect
from .models import UserSubscription
from .serializers import UserSubscriptionSerializer

class CheckSubscription(APIView):
    def get(self, request):
        email = request.GET.get('email')
        if not email:
            return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)

        # Check if the email exists in the database
        try:
            subscription = UserSubscription.objects.get(email=email)
            serializer = UserSubscriptionSerializer(subscription)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except UserSubscription.DoesNotExist:
            # If email does not exist, add it to the database
            new_subscription = UserSubscription.objects.create(email=email, is_subscribed=False)
            serializer = UserSubscriptionSerializer(new_subscription)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

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