from django.contrib import admin
from django.urls import path, include
from confidiaApi.views import (
    dashboard,
    login,
    dtProject,
    callback,
    logout,
    get_iubenda_policy
)
from subscriptions.views import CheckSubscription, subscribe_user, generate_user_token
from rest_framework.authtoken import views as authtoken_views  # Rename to avoid conflict

urlpatterns = [
    path('auth/login/', login, name='login'),
    path('auth/callback/', callback, name='callback'),
    path('auth/logout/', logout, name='logout'),  
    path('dtProject/', dtProject, name='dtProject'),
    path('dashboard/', dashboard, name='dashboard'),
    path('api/check-subscription/', CheckSubscription.as_view(), name='check_subscription'),
    path('api/subscribe-user/', subscribe_user, name='subscribe_user'),
    path('api-token-auth/', authtoken_views.obtain_auth_token, name='api_token_auth'),  # Use renamed import here
    path('api/generate-user-token/', generate_user_token, name='generate_user_token'),
    path('api/iubenda-policy/', get_iubenda_policy, name='get_iubenda_policy'),  # Use directly imported function
]
