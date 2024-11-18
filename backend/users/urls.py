# usuarios/urls.py

from django.urls import path
#from users.views import DesactivarUsuarioView
from .api.users import LoginAPIView, RegistroUsuarioView



urlpatterns = [
    path('registro/', RegistroUsuarioView.as_view(), name='registro_usuario'),
    #path('usuarios/<int:pk>/desactivar/', DesactivarUsuarioView.as_view(), name='desactivar-usuario'),
    path('login/', LoginAPIView.as_view(), name='api-login')
]
