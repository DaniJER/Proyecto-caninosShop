# usuarios/views.py
from django.shortcuts import render
from rest_framework.permissions import IsAdminUser
from rest_framework import generics
from .serializers import RegistroSerializer
from django.contrib.auth.models import User
from .permissions import IsAdminOrReadOnly
from .serializers import DesactivarUsuarioSerializer
from rest_framework.generics import RetrieveUpdateAPIView
from .models import Perfil


class RegistroUsuarioView(generics.CreateAPIView):
    queryset = Perfil.objects.all()
    serializer_class = RegistroSerializer
    permission_classes = [IsAdminOrReadOnly]  # Solo accesible para administradores

class DesactivarUsuarioView(RetrieveUpdateAPIView):
    queryset = Perfil.objects.all()
    serializer_class = DesactivarUsuarioSerializer
    permission_classes = [IsAdminUser]  # Solo administradores pueden acceder