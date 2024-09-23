from django.shortcuts import redirect, render
from django.contrib.auth import login, logout
from django.http import HttpResponse
import requests
from django.conf import settings
from oauth2_provider.views import AuthorizationView, TokenView, RevokeTokenView
from oauth2_provider.models import get_application_model
from django.contrib.auth.models import User, Group

Application = get_application_model()

# Create a sample application (replace with your app)
app = Application.objects.create(
    client_id='d4983a08-45dc-4861-b57c-2b897e74509f',
    client_secret='rTk8Q~tYBI-WBFD1ZhsSkPtDmvq1L6KNUpp1abCh',
    redirect_uris=['https://jwt.ms'],
    name='Your Django App',
)

class MyAuthorizationView(AuthorizationView):
    pass

class MyTokenView(TokenView):
    pass

class MyRevokeTokenView(RevokeTokenView):
    pass

def azure_ad_b2c_login(request):
    """Redirects the user to Azure AD B2C for authentication."""
    authorization_url = 'https://authAppTestConfidia.b2clogin.com/authAppTestConfidia.onmicrosoft.com/B2C_1_signupsignin1/oauth2/v2.0/authorize'
    auth_params = {
        'client_id': settings.CLIENT_ID,
        'response_type': 'code',
        'scope': 'openid groups',
        'redirect_uri': settings.REDIRECT_URI,
        'nonce': 'your_nonce',
        'state': 'your_state',
    }
    return redirect(authorization_url + '?' + '&'.join(f'{key}={value}' for key, value in auth_params.items()))

def azure_ad_b2c_callback(request):
    """Handles the callback from Azure AD B2C after successful authentication."""
    code = request.GET.get('code')
    token_endpoint = 'https://authAppTestConfidia.b2clogin.com/authAppTestConfidia.onmicrosoft.com/B2C_1_signupsignin1/oauth2/v2.0/token'
    token_params = {
        'grant_type': 'authorization_code',
        'client_id': settings.CLIENT_ID,
        'client_secret': settings.CLIENT_SECRET,
        'code': code,
        'redirect_uri': settings.REDIRECT_URI,
    }
    response = requests.post(token_endpoint, data=token_params)
    access_token = response.json()['access_token']

    # Use the access token to retrieve user information and groups from Azure AD B2C
    user_info_endpoint = 'https://authAppTestConfidia.b2clogin.com/authAppTestConfidia.onmicrosoft.com/B2C_1_signupsignin1/userinfo'
    headers = {'Authorization': f'Bearer {access_token}'}
    user_info_response = requests.get(user_info_endpoint, headers=headers)
    user_data = user_info_response.json()

    # Create or update user in Django database if needed
    user, created = User.objects.get_or_create(username=user_data['sub'])
    user.first_name = user_data.get('given_name', '')
    user.last_name = user_data.get('family_name', '')
    user.email = user_data.get('email', '')
    user.save()

    # Get the user's group information from the userinfo response
    groups = user_data.get('groups', [])

    # Add user to corresponding groups in Django
    for group_name in groups:
        try:
            group, created = Group.objects.get_or_create(name=group_name)
            user.groups.add(group)
        except Exception as e:
            print(f"Error adding user to group: {e}")

    # Authenticate the user in Django
    login(request, user)

    return redirect(settings.LOGIN_REDIRECT_URL)

def azure_ad_b2c_logout(request):
    """Logs out the user from Azure AD B2C."""
    logout_endpoint = 'https://authAppTestConfidia.b2clogin.com/authAppTestConfidia.onmicrosoft.com/B2C_1_signupsignin1/oauth2/v2.0/logout'
    post_logout_redirect_uri = settings.LOGOUT_REDIRECT_URL
    params = {
        'post_logout_redirect_uri': post_logout_redirect_uri
    }
    logout(request)
    return redirect(logout_endpoint + '?' + '&'.join(f'{key}={value}' for key, value in params.items()))

urlpatterns = [
    path('login/azure-ad-b2c/', azure_ad_b2c_login, name='login'),
    path('callback/', azure_ad_b2c_callback, name='callback'),
    path('logout/azure-ad-b2c/', azure_ad_b2c_logout, name='logout'),
    path('o/authorize/', MyAuthorizationView.as_view(), name='authorize'),
    path('o/token/', MyTokenView.as_view(), name='token'),
    path('o/revoke_token/', MyRevokeTokenView.as_view(), name='revoke_token'),
]