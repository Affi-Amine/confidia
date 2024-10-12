from django.urls import path
from rest_framework import routers
from django.conf.urls import include
from rest_framework.authtoken import views

from .views import dtProject
from subscriptions.views import  CheckSubscription  # Import the correct function

router = routers.DefaultRouter()

# If you plan to use routers later, uncomment the lines below
# router.register('script', dtProject)

# Define your urlpatterns
urlpatterns = [
    path('script/', dtProject),  # Ensure this points to the correct view
    path('api/check-subscription/', CheckSubscription.as_view(), name='check_subscription'),
    path('api-token-auth/', views.obtain_auth_token, name='api_token_auth'),
]
    # Use the correct reference to 'check_subscription' imported from 'subscriptions.views'
