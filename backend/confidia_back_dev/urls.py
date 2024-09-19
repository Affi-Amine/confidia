from django.conf import settings
from django.contrib import admin
from django.urls import path, include
from django.shortcuts import redirect  # Importe redirect pour gérer les redirections
from confidiaApi.views import redirect_view, index_view  # Import the new view
from ms_identity_web.django.msal_views_and_urls import MsalViews

msal_urls = MsalViews(settings.MS_IDENTITY_WEB).url_patterns()

# Liste des URLs pour ton projet Django
urlpatterns = [
    path('admin/', admin.site.urls),
    path('confidiaApi/', include('confidiaApi.urls')),
    path('', index_view, name='index'),  # Add this line to map the root URL to the index view
    path(f'{settings.AAD_CONFIG.django.auth_endpoints.prefix}/', include(msal_urls)),
]
