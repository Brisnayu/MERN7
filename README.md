# Proyecto MERN 7

Hola 👋🏽 Este proyecto te invita a explorar una API completa centrada en el emocionante mundo del mobiliario y el diseño de interiores. Descubrirás diseñadores y piezas de mobiliario icónicas que han dejado una marca indeleble en la historia de la decoración y el interiorismo.

Dentro de los modelos están los básicos para los diseñadores y diseños:

Diseñadores:
```javascript
const document = {
    _id: "id_de_mongoDB",
    name: "nombre_del_diseñador",
    surname: "apellido_del_diseñador",
    nationality: "nacionalidad_del_diseñador",
    image: "fotografía_del_diseñador",
    design: "diseños_asociados_al_diseñador",
}
```
Diseños:
```javascript
const document = {
    _id: "id_de_mongoDB",
    name: "nombre_del_diseño",
    images: "imágenes_del_diseño",
    year: "año_del_diseño",
    designer: "diseñador",
    category: "señala_una_de_las_características_predeterminadas",
}
```

También hay un modelo de users, que serán los encargados de crear modificaciones en la base de datos:
```javascript
const document = {
    _id: "id_de_mongoDB",
    name: "nombre_de_usuario",
    email: "email_único",
    password: "contraseña",
    avatar: "imagen_de_usuario",
}
```

## Endpoints:

https://localhost:4001/api

### MODELO DISEÑADORES:
https://localhost:4001/api/designer

| HTTP Request | Endpoint      | Descripción                           |
|--------------|---------------|---------------------------------------|
| GET          | /             | Todos los diseñadores.                |
| GET          | /:id          | Datos del diseñador por su id.        |
| POST         | /             | Registrar un nuevo diseñador.*        |
| PUT          | /:id          | Actualizar datos del diseñador.*      |
| DELETE       | /:id          | Eliminar información de un diseñador.*|

**Leyenda**
*Rutas protegidas.

### MODELO DISEÑOS:
https://localhost:4001/api/design 

| HTTP Request | Endpoint      | Descripción                              |
|--------------|---------------|------------------------------------------|
| GET          | /             | Todos los diseños.                       |
| GET          | /:id          | Datos del diseño por su id.              |
| POST         | /             | Registrar un nuevo diseño.*              |
| PUT          | /:id          | Actualizar cualquier dato del diseño.*   |
| PUT          | /images/:id   | Actualizar imágenes del diseño.(*)(**)   |
| DELETE       | /:id          | Eliminar información de un diseño.*      |

**Leyenda**
*Rutas protegidas.
**Actualización de las imágenes de los diseños, al utilizar con este endpoint, se eliminarán las fotos anteriores.

### MODELO USUARIOS:
https://localhost:4001/api/user

| HTTP Request | Endpoint         | Descripción                           |
|--------------|------------------|---------------------------------------|
| GET          | /                | Todos los usuarios.                   |
| POST         | /auth/register   | Registrar un nuevo usuario.*          |
| POST         | /auth/login      | Acceso al usuario.*                   |
| POST         | /auth/avatar/:id | Actualizar avatar del usuario.*       |
| DELETE       | /:id             | Eliminar usuario.*                    |

**Leyenda**:

*Rutas protegidas.

####  Información importante:

1.- Se pueden realizar 50 peticiones cada 3 minutos.
2.- El JWT tiene una caducidad de una hora.
3.- En los endpoints "getById" de tanto diseñadores como diseños, encontrarás todos los datos relacionados. Esto te permite acceder y leer de manera integral toda la información relevante.
4.- Todas las imágenes se almacenan en Cloudinary. Es importante mencionar que si se actualiza o elimina algún dato en la API, este se eliminará automáticamente de Cloudinary. Este enfoque garantiza la coherencia y la integridad de los recursos visuales, manteniendo un sistema perfectamente sincronizado y actualizado en todo momento.

#### Recuerda que para cualquier duda o comentario, puedes contactarme ✌🏼😊

![Gif gatito feliz](https://i.pinimg.com/originals/9e/e9/02/9ee902c4fcbed59c1c7f5a8ccabb0cc6.gif)