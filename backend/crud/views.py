from django.shortcuts import render
from rest_framework import viewsets
from .models import CrearUsuario
from .serializers import UsuarioSerializer
from django.contrib.auth.decorators import user_passes_test
from django.shortcuts import get_object_or_404, redirect
from django.http import HttpResponseForbidden
from .models import User  # importar tu modelo de usuario
# Create your views here.


class UsuarioNuevoSet(viewsets.ModelViewSet):
    queryset = CrearUsuario.objects.all()
    serializer_class = UsuarioSerializer


# Decorador para verificar si el usuario es administrador
def admin_required(user):
    return user.is_staff or user.is_superuser

@user_passes_test(admin_required)
def eliminar_usuario(request, user_id):
    usuario = get_object_or_404(User, id=user_id)
    # Verificamos que no está eliminando a sí mismo
    if request.user == usuario:
        return HttpResponseForbidden("No puedes eliminarte a ti mismo.")
    usuario.delete()
    return redirect('nombre_de_la_vista_despues_de_eliminar')  # Redirige a la vista deseada
