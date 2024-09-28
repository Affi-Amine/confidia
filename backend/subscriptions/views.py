from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import UserSubscription
from .serializers import UserSubscriptionSerializer

class CheckSubscription(APIView):
    def get(self, request):
        email = request.GET.get('email')
        if not email:
            return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)

        # Vérifier si l'e-mail existe dans la base de données
        try:
            subscription = UserSubscription.objects.get(email=email)
            serializer = UserSubscriptionSerializer(subscription)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except UserSubscription.DoesNotExist:
            # Si l'e-mail n'existe pas, on l'ajoute à la base de données
            new_subscription = UserSubscription.objects.create(email=email, is_subscribed=True)
            serializer = UserSubscriptionSerializer(new_subscription)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
