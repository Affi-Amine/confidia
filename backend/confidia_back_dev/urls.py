from django.conf import settings
from django.contrib import admin
from django.urls import path, include
from django.shortcuts import redirect  # Importe redirect pour gérer les redirections
from confidiaApi.views import redirect_view  # Vue de redirection vers le front-end React

from rest_framework.authtoken.views import obtain_auth_token
from ms_identity_web.django.msal_views_and_urls import MsalViews

msal_urls = MsalViews(settings.MS_IDENTITY_WEB).url_patterns()

# Liste des URLs pour ton projet Django
urlpatterns = [
    path('admin/', admin.site.urls),
    path('confidiaApi/', include('confidiaApi.urls')),
    path(f'{settings.AAD_CONFIG.django.auth_endpoints.prefix}/', include(msal_urls)),
]

# Rediriger la racine ('/') vers la page 'HomeLogin' dans le front-end React
urlpatterns += [
    path('', lambda request: redirect('http://localhost:3000/home'), name='home_redirect'),  # Redirige la racine vers React
]

# Ajout de la route de redirection pour l'authentification
urlpatterns += [
    path('auth/redirect/', redirect_view, name='auth_redirect'),  # Redirection vers React (HomeLogin)
]