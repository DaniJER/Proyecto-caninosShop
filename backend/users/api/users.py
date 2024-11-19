from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

from users.models import Perfil
from ..permissions import IsAdminOrReadOnly
from ..serializers import UserLoginSerializer, DesactivarUsuarioSerializer, ListarUsuariosSerializer
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework import status
from rest_framework.generics import ListAPIView
from rest_framework.generics import RetrieveUpdateAPIView
from django.db import IntegrityError


#API DE LOGIN PARA USUARIOS
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

#API PARA REGISTRAR USUARIOS (OPCION SOLO PARA ADMINS)
class RegistroUsuarioView(APIView):
    # Permite acceso solo a usuarios administradores
    permission_classes = [IsAdminUser]

    def post(self, request, *args, **kwargs):
        username = request.data.get("username")
        userType = request.data.get("userType", "client")  # Valor por defecto "client"
        name = request.data.get("name")
        lastName = request.data.get("lastName")
        email = request.data.get("email")
        password = request.data.get("password")
        
        # Validaciones iniciales
        if not username or not password or not email:
            return Response(
                {"error": "Se requieren username, password y email"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Verificar si el correo ya existe
        if Perfil.objects.filter(email=email).exists():
            return Response(
                {"error": "El correo electrónico ya está registrado."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            # Crear el usuario con todos los datos
            user = Perfil.objects.create_user(
                username=username,
                password=password,
                email=email,
                userType=userType,
                name=name,
                lastName=lastName,
            )
            
            return Response(
                {"mensaje": f"Usuario {username} creado con éxito"},
                status=status.HTTP_201_CREATED
            )
        except IntegrityError as e:
            return Response(
                {"error": "Error al crear el usuario. Verifica los datos proporcionados."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
#API PARA LISTAR USUARIOS
class ListarUsuariosView(ListAPIView):
    # Permite acceso a todos los usuarios autenticados
    permission_classes = [IsAuthenticated]
    queryset = Perfil.objects.all()
    serializer_class = ListarUsuariosSerializer


#API PARA DESACTIVAR USUARIOS (OPCION SOLO PARA ADMINS)
class DesactivarUsuarioView(RetrieveUpdateAPIView):
    queryset = Perfil.objects.all()
    serializer_class = DesactivarUsuarioSerializer
    permission_classes = [IsAdminOrReadOnly]  # Aplicamos el permiso personalizado

#API PARA FILTRAR A LOS USUARIOS 
class FiltrarUsuariosView(ListAPIView):
    permission_classes = [IsAuthenticated]  # Asegúrate de que solo usuarios autenticados puedan usarlo
    serializer_class = ListarUsuariosSerializer
    queryset = Perfil.objects.all()  # Base inicial de usuarios

    def get_queryset(self):
        """
        Personaliza el queryset según los parámetros recibidos en la petición.
        """
        queryset = super().get_queryset()
        params = self.request.query_params  # Obtén los parámetros de la URL

        # Filtros disponibles
        username = params.get('username', None)
        userType = params.get('userType', None)
        email = params.get('email', None)
        is_active = params.get('is_active', None)

        # Aplicar filtros si están presentes
        if username:
            queryset = queryset.filter(username__icontains=username)
        if userType:
            queryset = queryset.filter(userType=userType)
        if email:
            queryset = queryset.filter(email__icontains=email)
        if is_active is not None:
            queryset = queryset.filter(is_active=is_active.lower() == 'true')

        return queryset   
    
#VISTA PARA CERRAR SESIÓN    
class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        try:
            # Obtener el token de refresco del cuerpo de la solicitud
            refresh_token = request.data.get("refresh")
            if not refresh_token:
                return Response({"error": "No se proporcionó un token de refresco."}, status=status.HTTP_400_BAD_REQUEST)
            
            # Invalidar el token de refresco
            token = RefreshToken(refresh_token)
            token.blacklist()  # Este método requiere haber habilitado el blacklist de JWT

            return Response({"mensaje": "Sesión cerrada exitosamente."}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": "Error al cerrar la sesión."}, status=status.HTTP_400_BAD_REQUEST)
