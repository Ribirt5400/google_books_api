# Biblioteca Virtual - Proyecto Vue con Google Books API

## Descripción del Proyecto

Biblioteca Virtual es una aplicación web desarrollada con **Vue 3** que permite a los usuarios explorar libros, gestionar estanterías personalizadas y realizar operaciones como añadir, eliminar o mover libros entre estanterías. La aplicación consume la **API de Google Books** para obtener información sobre los libros y utiliza **OAuth2.0** para la autenticación de usuarios.

## Características Principales

- **Búsqueda de libros:** Los usuarios pueden buscar libros por título, autor o género.
- **Gestión de estanterías:** Crear, editar y eliminar estanterías personalizadas.
- **Autenticación:** Inicio de sesión con Google OAuth2.0.
- **Operaciones CRUD:** Añadir, eliminar y mover libros entre colecciones.
- **Diseño elegante:** Interfaz moderna con tonos marrones y dorados, animaciones y efectos de hover.

## Tecnologías Utilizadas

- **Frontend:**
  - Vue 3
  - Vue Router
  - Pinia (gestión del estado)
  - SweetAlert2 (avisos personalizados)
  - Bootstrap (diseño y estilos)
- **Autenticación:**
  - OAuth2.0 con Google API
- **API:**
  - Google Books API

## Requisitos del Proyecto

- **5 peticiones GET:**
  1. Obtener libros de una búsqueda.
  2. Obtener las colecciones del usuario.
  3. Obtener libros de una colección específica.
  4. Obtener información del perfil del usuario.
  5. Verificar el token de autenticación.
- **5 peticiones POST, PUT, PATCH o DELETE:**
  1. Añadir un libro a una colección.
  2. Eliminar un libro de una colección.
  3. Vaciar una colección.
- **Autenticación:** OAuth2.0 con Google.
- **Diseño:** Interfaz moderna y responsive realizada con Bootstrap.

## Instalación y Configuración

Sigue estos pasos para ejecutar el proyecto en tu entorno local:

1. **Clona el repositorio:**

```sh
   git clone https://github.com/tu-usuario/tu-repositorio.git
   cd tu-repositorio
```

1.  **Instala las dependencias:**

```sh
    npm install
```

2.  **Inicia el servidor de desarrollo:**

```sh
    npm run serve
```

3.  **Accede a la aplicación:**\
    Abre tu navegador y visita `http://localhost:5173`.








https://console.cloud.google.com/auth/clients/1045115965460-07kbq3i0gps2hahuidj9dm6p4eu9vbn6.apps.googleusercontent.com?inv=1&invt=AbsRhw&project=libros-app-453416
