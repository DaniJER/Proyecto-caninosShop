# users/serializers.py
# usuarios/serializers.py

from rest_framework import serializers
from django.contrib.auth import get_user_model  # Usamos get_user_model() para obtener el modelo personalizado
from .models import Perfil
from django.contrib.auth.password_validation import validate_password


class RegistroSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only=True)
    userType = serializers.CharField(write_only=True, required=False)
    fullName = serializers.CharField(write_only=True, required=False)
    lastName = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = Perfil
        fields = ['username', 'userType', 'fullName', 'lastName', 'email', 'password', 'password2', ]

    def create(self, validated_data):
        password = validated_data.pop('password')
        password2 = validated_data.pop('password2')

        # Validación de contraseñas
        if password != password2:
            raise serializers.ValidationError("Las contraseñas no coinciden")

        # Validamos la contraseña usando el validador de Django
        try:
            validate_password(password)
        except serializers.ValidationError as e:
            raise serializers.ValidationError({'password': e.messages})

        # Usamos get_user_model() para crear el usuario (Perfil)
        user_data = {k: validated_data[k] for k in ['username', 'email'] if k in validated_data}
        User = get_user_model()  # Obtiene el modelo de usuario correcto
        user = User.objects.create_user(**user_data)  # Usamos el modelo correcto (Perfil)

        # Establecemos la contraseña
        user.set_password(password)
        user.save()

        # Crear el perfil asociado
        user.email = validated_data.get('email', '' )
        user.userType = validated_data.get('userType', 'client')
        user.fullName = validated_data.get('fullName', 'no proporcionado')
        user.lastName = validated_data.get('lastName', 'no proporcionado')
        user.save()  # Guardamos los cambios en el perfil

        return user


class DesactivarUsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()  # Usamos el modelo de usuario personalizado
        fields = ['id', 'username', 'is_active']

    def update(self, instance, validated_data):
        request = self.context.get('request')
        
        # Verifica si el usuario intenta desactivarse a sí mismo
        if instance == request.user and not validated_data.get('is_active', True):
            raise serializers.ValidationError("No puedes desactivarte a ti mismo.")

        instance.is_active = validated_data.get('is_active', instance.is_active)
        instance.save()
        return instance


class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        # Intenta encontrar un usuario con el correo proporcionado
        try:
            user = get_user_model().objects.get(email=email)
        except get_user_model().DoesNotExist:
            raise serializers.ValidationError("Credenciales inválidas. El email no está en la base de datos.")

        # Verifica si la contraseña es correcta
        if not user.check_password(password):
            raise serializers.ValidationError("Credenciales inválidas.")

        data['user'] = user
        return data
    
class ListarUsuariosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Perfil
        fields = ['id', 'username', 'userType', 'fullName', 'lastName', 'email', 'date_joined']  # Agrega los campos que deseas incluir


class IncorrectoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Perfil
        fields = ['id', 'fullName', 'email']