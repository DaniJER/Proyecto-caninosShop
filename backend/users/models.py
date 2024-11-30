from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.utils import timezone
from django.core.exceptions import ValidationError

class UserManager(BaseUserManager):
    """
    Manager personalizado para manejar la creación de usuarios y superusuarios.
    """
    def create_user(self, username, email, password=None, **extra_fields):
        if not email:
            raise ValueError("El correo electrónico debe ser proporcionado.")
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)  # Utiliza el set_password de AbstractBaseUser
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None, **extra_fields):
        """
        Crea un superusuario con los privilegios adecuados.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(username, email, password, **extra_fields)

class User(AbstractBaseUser):
    # Definir las opciones de tipos de usuario
    USER_TYPE_CHOICES = [
        ('client', 'Client'),  # Cliente
        ('admin', 'Admin'),    # Administrador
        ('staff', 'Staff'),    # Personal
    ]

    # Campos básicos
    username = models.CharField(max_length=150, unique=True, blank=False)
    userType = models.CharField(
        max_length=150,
        choices=USER_TYPE_CHOICES,  # Agregar las opciones
        default='client',          # Valor por defecto
    )
    fullName = models.CharField(max_length=255, blank=False)
    lastName = models.CharField(max_length=255, blank=False)
    email = models.EmailField(unique=True)
    
    # Estados del usuario
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)  # Permite acceso al admin
    is_superuser = models.BooleanField(default=False)

    # Fechas importantes
    date_joined = models.DateTimeField(default=timezone.now)
    last_login = models.DateTimeField(auto_now=True)

    # Manager
    objects = UserManager()

    # Definir el campo que se usará para la autenticación
    USERNAME_FIELD = 'username'  # O 'email', dependiendo de tu elección

    # Campos requeridos para el superusuario
    REQUIRED_FIELDS = ['email']  # Aquí 'fullName' ya no es necesario

    #USERNAME_FIELD = 'email'  # Cambia el identificador principal a 'email'
    #REQUIRED_FIELDS = ['username']  # Especifica campos requeridos adicionales

    class Meta:
        db_table = "users_perfil"  # Apunta a la tabla existente

    def __str__(self):
        return self.username

    def set_password(self, raw_password):
        """ Establece la contraseña de manera segura. """
        super().set_password(raw_password)  # Utiliza el método de AbstractBaseUser para encriptar la contraseña.

    def check_password(self, raw_password):
        """ Verifica si la contraseña es válida. """
        return super().check_password(raw_password)
    
 # Utiliza el método de AbstractBaseUser para verificar la contraseña.