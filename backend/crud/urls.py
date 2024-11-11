from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UsuarioNuevoSet
from . import views

router = DefaultRouter()
router.register(r'Usuarios', UsuarioNuevoSet)

urlpatterns = [
    path('', include(router.urls)),
    path('eliminar-usuario/<int:user_id>/', views.eliminar_usuario, name='eliminar_usuario'),
]
