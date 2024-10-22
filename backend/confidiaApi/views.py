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
from django.contrib.auth import login as auth_login
from msal import ConfidentialClientApplication
import base64
import hashlib
import os
from django.views.decorators.csrf import csrf_exempt
import stripe


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


def generate_code_verifier():
    # Create a random string (code_verifier) of 128 characters
    code_verifier = base64.urlsafe_b64encode(os.urandom(40)).rstrip(b'=').decode('utf-8')
    return code_verifier

def generate_code_challenge(code_verifier):
    # Hash the code_verifier using SHA256 and encode it as base64url
    code_challenge = base64.urlsafe_b64encode(hashlib.sha256(code_verifier.encode()).digest()).rstrip(b'=').decode('utf-8')
    return code_challenge

def login(request):
    if request.user.is_authenticated:
        return redirect(reverse('dashboard'))  # Redirect if user is already logged in

    code_verifier = generate_code_verifier()  # Generate code_verifier
    code_challenge = generate_code_challenge(code_verifier)  # Generate code_challenge
    print("Generated code_verifier:", code_verifier)
    print("Session contains code_verifier:", request.session.get('code_verifier'))

    # Save the code_verifier in session
    request.session['code_verifier'] = code_verifier

    azure_ad_login_url = (
        'https://ConfidiaTestEntraIDB2C.b2clogin.com/'
        'ConfidiaTestEntraIDB2C.onmicrosoft.com/oauth2/v2.0/authorize?'
        'p=B2C_1_signupsignin1&client_id=d4983a08-45dc-4861-b57c-2b897e74509f&'
        f'redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Fauth%2Fcallback&scope=openid&'
        f'response_type=code&prompt=login&code_challenge={code_challenge}&code_challenge_method=S256'
    )

    return redirect(azure_ad_login_url)

import jwt

def decode_id_token(id_token):
    # Decode the ID token (you'll need to provide your Azure AD B2C public keys for verification)
    try:
        decoded = jwt.decode(id_token, options={"verify_signature": False})  # Use actual verification in production
        return decoded
    except jwt.ExpiredSignatureError:
        return {}
    except jwt.InvalidTokenError:
        return {}

def dashboard(request):
    id_token = request.POST.get('id_token') 
    
    # Decode the ID token to get user information
    user_info = decode_id_token(id_token)

    # Store relevant user information in the session
    request.session['user_email'] = user_info.get('email')  # Adjust if necessary
    request.session['inscrit'] = user_info.get('Inscrit')  # Adjust if necessary
    user_email = request.session.get('user_email')
    inscrit = request.session.get('inscrit')
    context = {
        'user_email': user_email,
        'inscrit': inscrit,
    }
    return render(request, 'dashboard.html', context)

@csrf_exempt
def callback(request):
    # Simulating user info received from Azure AD B2C
    user_info = {
        'email': request.POST.get('email'), 
        'name': request.POST.get('name'),    
    }

    # Store user information in the session
    request.session['user_email'] = user_info['email']
    request.session['user_name'] = user_info['name']

    # Redirect to the desired page after login
    return redirect('http://localhost:3000/testpage')


@api_view(['POST'])
@authentication_classes([TokenAuthentication])  # Requires authentication to logout
@permission_classes([IsAuthenticated])
def logout(request):
    # Implement your logout logic (e.g., invalidate the session)
    return JsonResponse({'message': 'Logged out successfully.'}, status=200)

## IUBENDA ##
@csrf_exempt
def get_data_processing_info(request):
    if request.method == "GET":
        try:
            iubenda_api_url = "https://www.iubenda.com/api/privacy-policy/90624318/section/data-processing-detailed-info/only-legal"
            response = requests.get(iubenda_api_url)

            if response.status_code == 200:
                return JsonResponse({"policy": response.text})
            else:
                return JsonResponse({"error": "Failed to fetch policy content"}, status=500)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=405)

@csrf_exempt
def get_further_data_info(request):
    if request.method == "GET":
        try:
            iubenda_api_url = "https://www.iubenda.com/api/privacy-policy/90624318/section/further-data/only-legal"
            response = requests.get(iubenda_api_url)

            if response.status_code == 200:
                return JsonResponse({"policy": response.text})
            else:
                return JsonResponse({"error": "Failed to fetch policy content"}, status=500)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=405)

@csrf_exempt
def get_technical_cookies_info(request):
    if request.method == "GET":
        try:
            iubenda_api_url = "https://www.iubenda.com/api/privacy-policy/90624318/cookie-policy/section/technical-cookies/only-legal"
            response = requests.get(iubenda_api_url)

            if response.status_code == 200:
                return JsonResponse({"policy": response.text})
            else:
                return JsonResponse({"error": "Failed to fetch policy content"}, status=500)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=405)

@csrf_exempt
def get_other_types_cookies_info(request):
    if request.method == "GET":
        try:
            iubenda_api_url = "https://www.iubenda.com/api/privacy-policy/90624318/cookie-policy/section/other-types-cookies/only-legal"
            response = requests.get(iubenda_api_url)

            if response.status_code == 200:
                return JsonResponse({"policy": response.text})
            else:
                return JsonResponse({"error": "Failed to fetch policy content"}, status=500)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=405)
    return JsonResponse({"error": "Invalid request method"}, status=405)

import stripe
from django.conf import settings
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt

# Set your Stripe secret key from environment
stripe.api_key = settings.STRIPE_SECRET_KEY

@csrf_exempt
def stripe_webhook(request):
    if request.method != "POST":
        return HttpResponseNotAllowed(['POST'])

    payload = request.body
    sig_header = request.META.get('HTTP_STRIPE_SIGNATURE')
    endpoint_secret = settings.STRIPE_WEBHOOK_SECRET

    if not sig_header:
        return JsonResponse({'error': 'Missing signature header'}, status=400)

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, endpoint_secret
        )
    except ValueError as e:
        # Invalid payload
        return JsonResponse({'error': 'Invalid payload'}, status=400)
    except stripe.error.SignatureVerificationError as e:
        # Invalid signature
        return JsonResponse({'error': 'Invalid signature'}, status=400)

    # Handle the event
    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        # Fulfill the purchase here
        print('Payment was successful:', session)

    return JsonResponse({'status': 'success'}, status=200)
@api_view(['POST'])
def create_checkout_session(request):
    try:
        # Create a new checkout session
        checkout_session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[
                {
                    'price_data': {
                        'currency': 'usd',
                        'product_data': {
                            'name': 'Subscription Product',
                        },
                        'unit_amount': 5000,  # 50.00 USD (amount in cents)
                    },
                    'quantity': 1,
                },
            ],
            mode='payment',
            success_url=request.build_absolute_uri('/success'),
            cancel_url=request.build_absolute_uri('/cancel'),
        )

        # Return the session URL to redirect the user
        return JsonResponse({'id': checkout_session.id, 'url': checkout_session.url})

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)