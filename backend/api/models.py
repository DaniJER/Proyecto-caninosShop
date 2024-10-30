from django.db import models

# Create your models here.
class User(models.Model):
    fullName = models.CharField(max_length=100)
    rol = models.l(max_length=100)