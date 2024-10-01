"""
URL configuration for confidia_back_dev project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from rest_framework.authtoken.views import obtain_auth_token
from django.urls import path
from confidiaApi.views import dashboard, login, dtProject, callback, logout
from subscriptions.views import CheckSubscription, subscribe_user, generate_user_token
from rest_framework.authtoken import views


urlpatterns = [
    path('auth/login/', login, name='login'),
    path('auth/callback/', callback, name='callback'),
    path('auth/logout/', logout, name='logout'),  
    path('dtProject/', dtProject, name='dtProject'),
    path('dashboard/', dashboard, name='dashboard'),
    path('api/check-subscription/', CheckSubscription.as_view(), name='check_subscription'),
    path('api/subscribe-user/', subscribe_user, name='subscribe_user'),
    path('api-token-auth/', views.obtain_auth_token, name='api_token_auth'),
    path('api/generate-user-token/', generate_user_token, name='generate_user_token'), 
]

