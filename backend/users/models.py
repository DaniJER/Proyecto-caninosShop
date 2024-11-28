from django.contrib.auth.models import AbstractUser
from django.db import models

class Perfil(AbstractUser):
    ADMIN = 'admin'
    CLIENT = 'client'
    CHOICES_USER_TYPE = [
        (ADMIN, 'Admin'),
        (CLIENT, 'Client'),
    ]
    
    username = models.CharField(max_length=100, null=False, unique=True)
    userType = models.CharField(
        max_length=10,
        choices=CHOICES_USER_TYPE
    )
    fullName = models.CharField(max_length=100, null=False)
    lastName = models.CharField(max_length=100, null=False)
    email = models.EmailField(unique=True)

    #USERNAME_FIELD = 'email'  # Cambia el identificador principal a 'email'
    #REQUIRED_FIELDS = ['username']  # Especifica campos requeridos adicionales

    class Meta:
        db_table = "users_perfil"  # Apunta a la tabla existente

    def __str__(self):
        return self.username

