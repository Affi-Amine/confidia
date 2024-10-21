from django.urls import path
from confidiaApi.views import (
    dashboard,
    login,
    dtProject,
    callback,
    logout,
    get_data_processing_info,
    get_further_data_info,
    get_technical_cookies_info,
    get_other_types_cookies_info,
    stripe_webhook
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
    path('api-token-auth/', authtoken_views.obtain_auth_token, name='api_token_auth'), 
    path('api/generate-user-token/', generate_user_token, name='generate_user_token'),

    # Updated API Endpoints
    path('api/data-processing-info/', get_data_processing_info, name='get_data_processing_info'),
    path('api/further-data-info/', get_further_data_info, name='get_further_data_info'),
    path('api/technical-cookies/', get_technical_cookies_info, name='get_technical_cookies_info'),
    path('api/other-types-cookies/', get_other_types_cookies_info, name='get_other_types_cookies_info'),
    
    #stripe
    path('stripe/webhook/', stripe_webhook, name='stripe_webhook'),
]