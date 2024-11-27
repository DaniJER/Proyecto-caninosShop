# usuarios/urls.py

from django.urls import path
from .api.users import FiltrarUsuariosView, LoginAPIView, LogoutView, RegistroUsuarioView, DesactivarUsuarioView, ListarUsuariosView



urlpatterns = [
    path('register/', RegistroUsuarioView.as_view(), name='registro_usuario'),
    path('desactive-user/<int:pk>/', DesactivarUsuarioView.as_view(), name='desactivar-usuario'),
    path('login/', LoginAPIView.as_view(), name='api-login'),
    path('users/', ListarUsuariosView.as_view(), name='listar_usuarios'),
    path('users/filter/', FiltrarUsuariosView.as_view(), name='filtrar_usuarios'),
    path('logout/', LogoutView.as_view(), name='logout'),
]
