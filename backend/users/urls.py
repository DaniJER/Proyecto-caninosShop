# usuarios/urls.py

from django.urls import path
from .views import RegistroUsuarioView
from .api import LoginAPIView

urlpatterns = [
    path('registro/', RegistroUsuarioView.as_view(), name='registro'),
    path('login/', LoginAPIView.as_view(), name='api-login')
]
