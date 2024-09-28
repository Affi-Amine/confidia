from django.http import JsonResponse
from .models import UserSubscription  # Make sure this is correct

def check_subscription(request):
    email = request.GET.get('email')
    if not email:
        return JsonResponse({'error': 'Email is required'}, status=400)

    try:
        # Update the query to filter by email instead of user
        subscription = UserSubscription.objects.get(email=email)
        return JsonResponse({'subscription_active': subscription.is_subscribed}, status=200)
    except UserSubscription.DoesNotExist:
        return JsonResponse({'error': 'Subscription not found'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)