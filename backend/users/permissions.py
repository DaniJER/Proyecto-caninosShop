# usuarios/permissions.py
from rest_framework.permissions import BasePermission

class IsAdminOrReadOnly(BasePermission):
    """
    Permite solo a administradores crear usuarios, pero permite leer para todos.
    """
    def has_permission(self, request, view):
        
        # Solo permitir POST si el usuario es administrador
        if request.method == 'POST':
            return request.user and request.user.is_staff
        # Permitir otros métodos (como GET) para todos
        return True
