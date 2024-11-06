from django.db import models

# Create your models here.

class CrearUsuario(models.Model):
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    rol = models.CharField(max_length=100)
    contrasena = models.CharField(max_length=100)
    contrasena2 = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre
