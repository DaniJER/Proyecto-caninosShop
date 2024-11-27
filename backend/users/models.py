from django.contrib.auth.models import AbstractUser
from django.db import models

class Perfil(AbstractUser):
    ADMIN = 'admin'
    CLIENT = 'client'
    CHOICES_USER_TYPE = [
        (ADMIN, 'Admin'),
        (CLIENT, 'Client'),
    ]
    
    userName = models.CharField(max_length=100, blank=True, null=True)
    userType = models.CharField(
        max_length=10,
        choices=CHOICES_USER_TYPE
    )
    fullName = models.CharField(max_length=100, blank=True, null=False)
    lastName = models.CharField(max_length=100, blank=True, null=False)
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.username

