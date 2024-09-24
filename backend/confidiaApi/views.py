from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import action, api_view, authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.http import JsonResponse
from .models import Script, Test
from .serializers import ScriptSerializer
from .utils.udfs import documentScriptElements, formatRes
from datetime import datetime as dt
from django.shortcuts import redirect
from django.urls import reverse
import logging
import requests

available_languages = ['fr', 'it', 'en']

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def dtProject(request):
    if 'content' in request.data.keys():
        prjName = "Quick code documentation"
        prjDesc = "Manual inserted script"
        selConn = "Manual"
        selLang = "TO DO"
        selIntp = request.data['sriptLang']
        selScrp = "TO DO"
        currentManualScript = request.data['content']
        prjInfo = {
            "demoAlias": request.data['demoAlias'],
            "demoDescription": request.data['demoDescription'],
            "demoUserAlias": request.data['demoUserAlias']
        }

        compact_option = '' if request.data['frontCompactOption'] == 'compact' else '_minimum'
        user_language = request.data['appLan'] if request.data['appLan'] in available_languages else 'fr'
        user_image = request.data['projectImg']

        selPrj = {
            'contributor_ref': "TO DO",
            'name': prjName,
            'manager': "TO DO",
            'description': prjDesc,
            'connector_ref': selConn,
            'interpreter_ref': selIntp,
            'mainScript_ref': selScrp,
            'tagId': "QuickCode",
        }

        outvar = {'conts': "TO DO", 'loginUser': "TO DO", 'selectedContr': "TO DO"}
        outvar['selectedProject'] = selPrj
        resultsDict, code_rows, oneline_rows, comm_rows = documentScriptElements(currentManualScript, True, user_language, selIntp, compact_option)

        print('--- DONE TECH DOC ---')

        formated_out = formatRes(resultsDict, code_rows, oneline_rows, comm_rows, prjInfo)
        formated_out['dashboardDoc']['projectImg'] = user_image

        return JsonResponse(formated_out)
    else:
        response = {'message': 'UNEXPECTED ERROR : No Content in POST request'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)

from django.shortcuts import render, redirect
from django.urls import reverse
import msal  # Make sure to install the MSAL package if you haven't already

def login(request):
    # Check if the user is already authenticated
    if request.user.is_authenticated:
        return redirect(reverse('dashboard'))  # Change this to your success view name

    # Azure AD configuration
    client_id = 'YOUR_CLIENT_ID'
    tenant_id = 'YOUR_TENANT_ID'
    redirect_uri = 'http://localhost:8000/auth/callback'  # Adjust to your callback URL
    authority = f'https://login.microsoftonline.com/d4983a08-45dc-4861-b57c-2b897e74509f'

    if request.method == 'GET':
        return redirect('https://confidiatestentraidb2c.b2clogin.com/ConfidiaTestEntraIDB2C.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_signupsignin1&client_id=d4983a08-45dc-4861-b57c-2b897e74509f&nonce=defaultNonce&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Fauth%2Fcallback&scope=openid&response_type=id_token&prompt=login')

    # If it’s a POST request or any other method, return the login template
    return render(request, 'login.html')

logger = logging.getLogger(__name__)

@api_view(['GET'])
@authentication_classes([])  # No authentication required for the callback
@permission_classes([])  # No permissions required for the callback
def callback(request):
    code = request.GET.get('code')
    logger.debug(f"Received code: {code}")
    if not code:
        return JsonResponse({'error': 'No code received from Azure AD.'}, status=400)

    # Exchange the authorization code for tokens (implement this logic)
    tokens = exchange_code_for_tokens(code)

    if 'access_token' in tokens:
        # Validate the token (optional)
        if validate_token(tokens['access_token']):
            return render(request, 'dashboard.html', {'access_token': tokens['access_token']})
        else:
            return JsonResponse({'error': 'Invalid token.'}, status=401)

    return render(request, 'login.html', {'error': 'Failed to obtain tokens.'})

@api_view(['POST'])
@authentication_classes([TokenAuthentication])  # Requires authentication to logout
@permission_classes([IsAuthenticated])
def logout(request):
    # Implement your logout logic (e.g., invalidate the session)
    return JsonResponse({'message': 'Logged out successfully.'}, status=200)