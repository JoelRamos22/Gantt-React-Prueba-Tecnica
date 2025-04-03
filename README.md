# Prueba Técnica - In Projects Software

**Autor:** Germán Joel Ramos Jaimes

## 📌 Desafío

El objetivo de esta prueba técnica es desarrollar un **diagrama de Gantt** en React utilizando la librería **DHTMLX Gantt**, asegurando la implementación de funcionalidades CRUD y el almacenamiento de datos en una base de datos SQLite.

## 📋 Requerimientos

- Implementar un **componente en React** que utilice **DHTMLX Gantt** para visualizar las tareas.
- Crear las siguientes estructuras dentro del Gantt:
  - **Actividades principales (tasks)**.
  - **Subactividades (subtasks)** anidadas correctamente bajo una actividad principal.
  - **Actividades tipo proyecto (project tasks)** para agrupar varias actividades.
- Implementar funcionalidades **CRUD** (Crear, Leer, Actualizar y Eliminar) para:
  - **Actividades principales**.
  - **Subactividades**.
- Almacenar los datos en una base de datos, usando **SQLite**.
- Permitir la **edición de tareas** dentro del Gantt.
- Desarrollar un **backend en Node.js con Express** para manejar las operaciones sobre la base de datos.

## 📌 Requisitos adicionales

- El código debe estar alojado en **GitHub**.
- Se deben realizar al menos **5 commits** en el repositorio, reflejando el progreso del desarrollo.
- Crear una **rama de prueba (test-branch)** para probar cambios antes de fusionarlos con la rama principal.

---

## 🚀 Tecnologías Utilizadas

| Tecnología      | Descripción |
|---------------|------------|
| **React.js**  | Biblioteca para construir la interfaz de usuario. |
| **Node.js**   | Entorno de ejecución para el backend. |
| **Express.js** | Framework minimalista para manejar rutas y lógica del backend. |
| **SQLite**    | Base de datos ligera para almacenar las tareas del Gantt. |
| **Sequelize** | ORM para gestionar la base de datos de manera más eficiente. |
| **DHTMLX Gantt** | Librería para visualizar el diagrama de Gantt en el frontend. |
| **Swagger**   | Documentación interactiva de la API. |

---

## 🗂️ Estructura del Proyecto

Se utilizo el modelo MVC (Modelo-Vista-Controlador) para estructurar el proyecto.

```bash
📂 Proyecto
 ├── 📁 Client  # Aplicación en React con DHTMLX Gantt
 ├── 📁 App     # API en Node.js con Express
 │    ├── 📁 config      # Configuración de la base de datos
 │    ├── 📁 docs        # Configuración de Swagger
 │    ├── 📁 src
 │    │    ├── 📁 models      # Definición de modelos con Sequelize
 │    │    ├── 📁 routes      # Rutas para las operaciones CRUD
 │    │    ├── 📁 controllers # Lógica de negocio
 │    ├── server.js     # Punto de entrada del backend
 ├── 📁 database  # Base de datos SQLite almacenada en `/app/tmp/`
```
---

## 📊 Base de Datos

La base de datos SQLite se almacena en la ruta /app/tmp/database.sqlite. Todos los datos creados desde el CRUD se guardan aquí.

Si deseas restablecer la base de datos, simplemente elimina el archivo y reinicia el servidor.

```bash
rm /app/tmp/database.sqlite
npm start
```
---

## 🔗 Documentación de la API

Puedes acceder a la documentación completa de la API en Swagger a través de la siguiente URL:

🔗 http://localhost:3000/api-docs/#/

Aquí encontrarás detalles sobre los endpoints disponibles y cómo interactuar con ellos.

---

## 🎥 Tutorial del Gantt

Aquí tienes un GIF mostrando cómo usar el diagrama de Gantt, crear tareas y editarlas en tiempo real.

---

## 📌 Notas Finales

Se han utilizado Better Comments para agregar comentarios detallados dentro del código.

🚀 ¡Muchas gracias por tu atención y feliz coding! 🎉

