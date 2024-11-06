# Proyecto-caninosShop

Tienda Web para adquirir perros de raza

## Frontend

Requerimientos: node.js

```
cd frontend
npm install
npm run dev
```

## Backend

Requerimientos: python 3.8 => superior

```bash
cd backend

```

### 1. Crear un entorno virtual y activarlo

Crea y activa un entorno virtual para aislar las dependencias del proyecto:

```bash
py -m venv venv
venv\Scripts\activate

```

### 2. Instalar dependencias

Instala las dependencias del proyecto desde el archivo requirements.txt:

```bash
pip install -r requirements.txt

```

### 3. Aplicar migraciones

Aplica las migraciones de la base de datos para crear las tablas necesarias en SQLite:

```bash
py manage.py migrate

```

### 4. Crear un superusuario

Crea un superusuario para acceder al panel de administración de Django:

```bash
py manage.py createsuperuser

```

### 5. Ejecutar el servidor local

Ejecuta el servidor de desarrollo de Django:

```bash
py manage.py runserver

```

La aplicación estará disponible en [http://127.0.0.1:8000/api/Usuarios/](http://127.0.0.1:8000/api/Usuarios/)