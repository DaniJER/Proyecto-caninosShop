from django.contrib.auth.models import AbstractUser
from django.db import models

class Perfil(AbstractUser):
    ADMIN = 'admin'
    CLIENT = 'client'
    CHOICES_USER_TYPE = [
        (ADMIN, 'Admin'),
        (CLIENT, 'Client'),
    ]

    # Campo adicional para diferenciar entre tipos de usuario
    userType = models.CharField(
        max_length=10,
        choices=CHOICES_USER_TYPE,
        default=CLIENT,
    )
    name = models.CharField(max_length=100, blank=True, null=True)
    lastName = models.CharField(max_length=100, blank=True, null=True)
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.username
