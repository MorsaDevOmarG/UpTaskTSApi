# Proyecto - UPTASK

- Administrador de Tareas

## Herramientas y/o Tecnologías

- MERN
  - Un _stack_ es un conjunto de herramientas para crear una app.
  - _fullstack_ quiere decir que puedes crear el _stack_ completo de una _app_ y _mern stack_ te permite hacerlo al igual que _PERN_.
  - Nuestro _backend_ sigue siendo _Node_ con _Express_ pero otras opciones son: _Nest.js o Fastify_.
    - MongoDB
      - Base de Datos _NoSQL_ orientada a **documentos** y grandes cantidades de datos.
      - Los datos son almacenados en un formato similar a _JSON_ (documentos) llamada: _BSON_.
      - Las tablas se llaman: **colecciones** y los registros: **documentos**.
      - **NOSQL**
        - Son base de datos no relacionales.
        - Están diseñadas específicamente para modelos de datos específicos y tienen esquema flexibles para crear aplicaciones modernas.
        - Este tipo de bases de datos son bastante comunes cuando hay una gran cantidad de transacciones de: **lectura/escritura** y cuando los datos no son uniformes o relacionados.
    - Express
      - **_npm i express_**
      - **_npm i -D @types/express_**
    - React
    - Node.js
- Nodemon
  - **_npm i -D nodemon_**
  - **_npm i -D ts-node_**
  - Una vez instalado, configuramos en: **package.json**
    - ```
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "dev": "nodemon --exec ts-node src/index.ts"
      },  
    ```
  - Ejecutamos el comando:
    - **_npm run dev_**
  - Con ello todos los cambios que realicemos los estará mostrando en _consola_ sin necesidad de estar reiniciando o apuntando a llamar un archivo en específico.
- Typescript
  - **_npm i -D typescript_**
- Colors
  - **_ npm i colors_**
  - Sirve para poder personalizar los colores de las alertas o _logs_ en consola.
- Mongoose
  - **_npm i mongoose_**
  - _ODM_ para _MongoDB_.
  - Es un _ODM_ para _Node.js_.
  - _ORM: Object Relational Mapping_, en el caso de _ODM_ es lo mismo solo la D por _Document_ que es como _MongoDB_ se le conoce a la información almacenada en las colecciones.
  - _Mongoose_ es un _ODM_ que simplifica bastantes tareas y puede ser la herramienta más dura de este tipo en _Node.js_.
  - Al igual que _Sequelize_ se utilizan Modelos para diseñar los tipos de datos que tendrá nuestra información.
  - Tiene una gran cantidad de métodos para realizar las diferentes acciones del _CRUD_.
  - Se utiliza junto otras dependencias para manejar autenticación de usuarios, _has de password_ y más.
- ENV
  - **_npm i dotenv_**
  - Sirve para crear variables de entorno.

### Creación del proyecto

  - **_npm init --y_**