# users/serializers.py
# usuarios/serializers.py

from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Perfil

from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Perfil

class RegistroSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only=True)
    userType = serializers.CharField(write_only=True, required=False)
    name = serializers.CharField(write_only=True, required=False)
    lastName = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = Perfil  # Usamos Perfil, que extiende a User
        fields = ['username', 'email', 'password', 'password2', 'userType', 'name', 'lastName']

    def create(self, validated_data):
        print("Datos validados:", validated_data)  # Aquí imprimes los datos validados

        password = validated_data.pop('password')
        password2 = validated_data.pop('password2')

        # Validación de contraseñas
        if password != password2:
            raise serializers.ValidationError("Las contraseñas no coinciden")

        # Creamos el usuario (Perfil) con los datos filtrados
        user_data = {k: validated_data[k] for k in ['username', 'email'] if k in validated_data}
        user = Perfil.objects.create_user(**user_data)  # Usamos Perfil aquí

        # Establecemos la contraseña
        user.set_password(password)
        user.save()

        # Crear el perfil asociado
        user.userType = validated_data.get('userType', 'client')
        user.name = validated_data.get('name', '')
        user.lastName = validated_data.get('lastName', '')
        user.save()  # Guardamos los cambios en el perfil

        return user

    
 #PARA QUE EL ADMIN PUEDA DESACTIVAR USUARIOS   
class DesactivarUsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'is_active']

    def update(self, instance, validated_data):
        request = self.context.get('request')
        
        # Verifica si el usuario intenta desactivarse a sí mismo
        if instance == request.user and not validated_data.get('is_active', True):
            raise serializers.ValidationError("No puedes desactivarte a ti mismo.")

        instance.is_active = validated_data.get('is_active', instance.is_active)
        instance.save()
        return instance


    