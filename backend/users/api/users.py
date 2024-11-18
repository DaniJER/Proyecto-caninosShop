from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

from users.models import Perfil
from ..serializers import UserLoginSerializer
from rest_framework.permissions import IsAdminUser
from rest_framework import status
from django.contrib.auth.models import User


class LoginAPIView(APIView):
    permission_classes = [permissions.AllowAny]  # Permite acceso público

    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']  # Usuario autenticado

            # Genera los tokens JWT
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'message': 'Login successful',
            }, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RegistroUsuarioView(APIView):
    # Permite acceso solo a usuarios administradores
    permission_classes = [IsAdminUser]

    def post(self, request, *args, **kwargs):
        username = request.data.get("username")
        password = request.data.get("password")

        if not username or not password:
            return Response({"error": "Se requieren username y password"}, status=status.HTTP_400_BAD_REQUEST)

        user = Perfil.objects.create_user(username=username, password=password)
        return Response({"mensaje": f"Usuario {username} creado con éxito"}, status=status.HTTP_201_CREATED)
