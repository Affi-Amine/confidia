from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from .models import UserSubscription

def check_subscription(request):
    email = request.GET.get('email')  # Get email from request parameters
    try:
        user = User.objects.get(email=email)
        subscription = UserSubscription.objects.get(user=user)
        return JsonResponse({'subscription_active': subscription.subscription_active})
    except User.DoesNotExist:
        return JsonResponse({'subscription_active': False}, status=404)
    except UserSubscription.DoesNotExist:
        return JsonResponse({'subscription_active': False}, status=404)
    