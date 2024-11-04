from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
class NewUser(AbstractUser):
    name = models.CharField(max_length=15, blank=True, null=True)
    email = models.TextField(max_length=20)
    password = models.TextChoices(max_length=30)

    def __str__(self):
        return self.username