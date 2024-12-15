from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import action, api_view, authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.http import JsonResponse
from .models import Script, Test, Project, User, Notification, Connector
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
from .serializers import (
    ProjectSerializer, UserSerializer, NotificationSerializer, ScriptSerializer
)


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
    
# Project Views
class ProjectListView(APIView):
    def get(self, request):
        projects = Project.objects.all()
        serializer = ProjectSerializer(projects, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ProjectSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProjectDetailView(APIView):
    def get(self, request, pk):
        try:
            project = Project.objects.get(project_id=pk)
        except Project.DoesNotExist:
            return Response({"error": "Project not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = ProjectSerializer(project)
        return Response(serializer.data)

    def put(self, request, pk):
        try:
            project = Project.objects.get(project_id=pk)
        except Project.DoesNotExist:
            return Response({"error": "Project not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = ProjectSerializer(project, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            project = Project.objects.get(project_id=pk)
        except Project.DoesNotExist:
            return Response({"error": "Project not found"}, status=status.HTTP_404_NOT_FOUND)
        project.delete()
        return Response({"message": "Project deleted"}, status=status.HTTP_204_NO_CONTENT)

# Add and View Users
class UserListView(APIView):
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# View and Edit a Single User
class UserDetailView(APIView):
    def get(self, request, pk):
        try:
            user = User.objects.get(id_user=pk)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def put(self, request, pk):
        try:
            user = User.objects.get(id_user=pk)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def add_connector(request):
    if request.method == "POST":
        name = request.POST.get("name")
        connector_type = request.POST.get("type")
        admin_id = request.POST.get("admin")
        token = request.POST.get("token")
        repo_user = request.POST.get("repo_user")
        repo_name = request.POST.get("repo_name")
        user_ids = request.POST.getlist("users")

        admin = User.objects.get(id=admin_id)
        connector = Connector.objects.create(
            name=name,
            type=connector_type,
            admin=admin,
            token=token,
            repo_user=repo_user,
            repo_name=repo_name,
        )
        connector.users.set(User.objects.filter(id__in=user_ids))
        connector.save()

        messages.success(request, "Connector added successfully.")
        return redirect("view_connectors")

    users = User.objects.all()
    return render(request, "connectors/add_connector.html", {"users": users})

def view_connectors(request):
    connectors = Connector.objects.all()
    return render(request, "connectors/view_connectors.html", {"connectors": connectors})

def add_notification(request):
    if request.method == "POST":
        # Extract data from the form
        type = request.POST.get("type")
        title = request.POST.get("title")
        message = request.POST.get("message")
        context = request.POST.get("context")
        author_id = request.POST.get("author")
        user_ids = request.POST.getlist("users")  # List of user IDs
        project_ids = request.POST.getlist("projects")  # List of project IDs

        try:
            # Fetch author (optional field)
            author = User.objects.get(id_user=author_id) if author_id else None

            # Create Notification
            notification = Notification.objects.create(
                type=type,
                author=author,
                notification_title=title,
                notification_message=message,
                context=context,
            )

            # Link users to the notification
            for user_id in user_ids:
                user = User.objects.get(id_user=user_id)
                NotificationUser.objects.create(notification=notification, user=user)

            # Link projects to the notification
            for project_id in project_ids:
                project = Project.objects.get(project_id=project_id)
                NotificationProject.objects.create(notification=notification, project=project)

            messages.success(request, "Notification added successfully.")
            return redirect("view_notifications")

        except Exception as e:
            messages.error(request, f"An error occurred: {e}")
    
    users = User.objects.all()
    projects = Project.objects.all()
    return render(request, "notifications/add_notification.html", {"users": users, "projects": projects})

def view_notifications(request):
    # Retrieve notifications with related users and projects
    notifications = Notification.objects.prefetch_related(
        Prefetch("notificationuser_set", queryset=NotificationUser.objects.select_related("user")),
        Prefetch("notificationproject_set", queryset=NotificationProject.objects.select_related("project"))
    ).order_by("-created_at")

    return render(request, "notifications/view_notifications.html", {
        "notifications": notifications,
    })