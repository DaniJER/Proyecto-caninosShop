from rest_framework import serializers
from .models import CrearUsuario

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = CrearUsuario
        fields = '__all__'
