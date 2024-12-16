from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

from users.models import User
from ..permissions import IsAdminOrReadOnly
from ..serializers import UserLoginSerializer, DesactivarUsuarioSerializer, ListarUsuariosSerializer, FiltrarUsuariosSerializer, RegistroSerializer
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

# API PARA REGISTRAR USUARIOS (OPCION SOLO PARA ADMINS)
class RegistroUsuarioView(APIView):
    # Permite registrarse a los usuarios clientes
    queryset = User.objects.all()
    serializer_class = RegistroSerializer
    permission_classes = [permissions.AllowAny]
    
    def post(self, request, *args, **kwargs):
        username = request.data.get("username")
        userType = request.data.get("userType", "client")  # Valor por defecto "client"
        fullName = request.data.get("fullName")
        lastName = request.data.get("lastName")
        email = request.data.get("email")
        password = request.data.get("password")
        
        # Validaciones iniciales
        if not username or not password or not email:
            return Response(
                {"error": "Se requieren username, password y email"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if not fullName:
            return Response(
                {"error": "El campo 'name' (fullName) es obligatorio."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if not lastName:
            return Response(
                {"error": "El campo 'lastName' es obligatorio."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Verificar si el correo ya existe
        if User.objects.filter(email=email).exists():
            return Response(
                {"error": "El correo electrónico ya está registrado."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            # Configurar campos adicionales según el tipo de usuario
            extra_fields = {}
            if userType == "staff":
                extra_fields["is_staff"] = True
            elif userType == "admin":
                extra_fields["is_staff"] = True
                extra_fields["is_superuser"] = True

            # Crear el usuario con todos los datos y campos extra
            user = User.objects.create_user(
                username=username,
                userType=userType,
                fullName=fullName,
                lastName=lastName,
                email=email,
                password=password,
                **extra_fields  # Pasa los valores adicionales
            )
            
            return Response(
                {"mensaje": f"Usuario {username} fue creado con éxito"},
                status=status.HTTP_201_CREATED
            )
        
        except IntegrityError as e:
            # Mostrar el error completo para depurar mejor
            return Response(
                {"error": f"Error al crear el usuario. Detalle: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        except Exception as e:
            # Captura otros errores generales y muestra detalles
            return Response(
                {"error": f"Ha ocurrido un error inesperado. Detalle: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


#API PARA LISTAR USUARIOS
class ListarUsuariosView(ListAPIView):
    # Permite acceso a todos los usuarios autenticados
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = ListarUsuariosSerializer


#API PARA DESACTIVAR USUARIOS (OPCION SOLO PARA ADMINS)
class DesactivarUsuarioView(RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = DesactivarUsuarioSerializer
    permission_classes = [IsAdminOrReadOnly]  # Aplicamos el permiso personalizado

#API PARA FILTRAR A LOS USUARIOS 
class FiltrarUsuariosView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ListarUsuariosSerializer
    queryset = User.objects.all()

    def get_queryset(self):
        """
        Filtra el queryset según los parámetros de consulta proporcionados.
        """
        queryset = super().get_queryset()  # Obtén el queryset base
        params = self.request.query_params  # Parámetros de consulta de la petición

        # Recupera parámetros específicos
        user_id = params.get('id', None)
        username = params.get('username', None)

        # Aplica filtros
        if user_id:
            queryset = queryset.filter(id=user_id)
        if username:
            queryset = queryset.filter(username__icontains=username)

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
