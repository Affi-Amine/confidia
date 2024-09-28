from django.http import JsonResponse
from rest_framework.views import APIView

from .models import UserSubscription  # Make sure this is correct*   from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import UserSubscription
from .serializers import UserSubscriptionSerializer


class CheckSubscription(APIView):
    def get(self, request):
        email = request.GET.get('email')
        if not email:
            return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            subscription = UserSubscription.objects.get(email=email)
            serializer = UserSubscriptionSerializer(subscription)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except UserSubscription.DoesNotExist:
            return Response({'error': 'Subscription not found'}, status=status.HTTP_404_NOT_FOUND)


