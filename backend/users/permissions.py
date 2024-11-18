# usuarios/permissions.py
from rest_framework.permissions import BasePermission


class IsAdminOrReadOnly(BasePermission):
    """
    Permite solo a administradores crear usuarios, pero permite leer para todos.
    """
    def has_permission(self, request, view):
        
        # Solo permite modificaciones si el usuario es administrador
        if request.method == 'POST':
            if request.method in [ 'POST','PUT', 'PATCH', 'DELETE'] and not request.user.is_staff:
                return False
        return True
