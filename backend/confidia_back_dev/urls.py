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
    stripe_webhook,
    create_checkout_session, ProjectListView, ProjectDetailView, NotificationListView, NotificationDetailView, UserListView, UserDetailView, add_connector, view_connectors, add_notification, view_notifications
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
    path('script/', dtProject), 
    
    #stripe
    path('create-checkout-session/', create_checkout_session, name='create_checkout_session'),
    path('webhook/', stripe_webhook, name='stripe_webhook'),
    
    #new views
    path('projects/', ProjectListView.as_view(), name='project-list'),
    path('projects/<int:pk>/', ProjectDetailView.as_view(), name='project-detail'),
    
    path('users/', UserListView.as_view(), name='user-list'),
    path('users/<str:pk>/', UserDetailView.as_view(), name='user-detail'),
    
    path("connectors/add/", views.add_connector, name="add_connector"),
    path("connectors/", views.view_connectors, name="view_connectors"),
    
    path("notifications/add/", views.add_notification, name="add_notification"),
    path("notifications/", views.view_notifications, name="view_notifications"),
]