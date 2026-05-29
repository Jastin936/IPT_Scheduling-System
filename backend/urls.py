# backend/urls.py
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from events.views import RegisterView, EventViewSet

# Create standard router bindings for our automatic viewsets
router = DefaultRouter()
router.register(r'events', EventViewSet, basename='event')

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # Auth routing paths
    path('api/register/', RegisterView.as_view(), name='auth_register'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # Event routing paths
    path('api/', include(router.urls)),
]