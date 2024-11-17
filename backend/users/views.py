# usuarios/views.py
from django.shortcuts import render

# Create your views here.

from rest_framework import generics
from .serializers import RegistroSerializer
from django.contrib.auth.models import User

class RegistroUsuarioView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegistroSerializer
