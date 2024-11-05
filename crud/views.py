from django.shortcuts import render
from rest_framework import viewsets
from .models import CrearUsuario
from .serializers import UsuarioSerializer
# Create your views here.


class UsuarioNuevoSet(viewsets.ModelViewSet):
    queryset = CrearUsuario.objects.all()
    serializer_class = UsuarioSerializer
