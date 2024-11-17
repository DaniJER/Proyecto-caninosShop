# usuarios/urls.py

from django.urls import path
from .views import RegistroUsuarioView
from users.views import DesactivarUsuarioView

urlpatterns = [
    path('registro/', RegistroUsuarioView.as_view(), name='registro'),
    path('usuarios/<int:pk>/desactivar/', DesactivarUsuarioView.as_view(), name='desactivar-usuario'),
]
