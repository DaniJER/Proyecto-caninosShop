# usuarios/urls.py

from django.urls import path
from .views import RegistroUsuarioView

urlpatterns = [
    path('registro/', RegistroUsuarioView.as_view(), name='registro'),
]
