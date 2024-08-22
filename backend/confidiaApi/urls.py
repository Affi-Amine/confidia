from django.urls import path
from rest_framework import routers
from django.conf.urls import include

from .views import dtProject

router = routers.DefaultRouter()
# router.register('script',dtProject)

# urlpatterns = [
#     path('', include(router.urls)),
# ]

urlpatterns = [
    path('script/', dtProject),
]
