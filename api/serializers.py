from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'phone_number', 'address', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            email=validated_data['email'],
            phone_number=validated_data.get('phone_number'),
            address=validated_data.get('address')
        )
        user.set_password(validated_data['password'])  # Encripta la contraseña
        user.save()
        return user
