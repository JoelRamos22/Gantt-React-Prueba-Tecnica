# **📌 Prueba Técnica - In Projects Software**  

**Autor:** Germán Joel Ramos Jaimes  

## **📍 Descripción del Proyecto**  

Este proyecto implementa un **Diagrama de Gantt interactivo** en **React** utilizando **DHTMLX Gantt**, permitiendo la gestión eficiente de actividades y subactividades. Se ha desarrollado un backend en **Node.js con Express** para manejar las operaciones CRUD, y los datos se almacenan en **PostgreSQL** a través de **Railway**.  

El sistema permite:  

✅ **Visualizar tareas** en un Gantt interactivo.  
✅ **Crear, editar y eliminar** actividades principales y subtareas.  
✅ **Sincronización en tiempo real** con la base de datos.  
✅ **Documentación de la API con Swagger**.  

El proyecto se aloja en **Vercel** y **Railway** por lo que si desas probar el proyecto solo desde el frontend puedes acceder al link en el repositorio o mas abajo estará disponible el link directo, si te interesa probar el backend y ver su funcionamiento puedes acceder a la documentación de la API Swagger donde encontraras toda la informacion sobre como usar cada endpoint y podras probrarlas ahi mismo si deseas o un aplicaciones como insomnia o postman.

---

## **🚀 Tecnologías Utilizadas**  

| Tecnología      | Descripción |
|---------------|------------|
| **React.js**  | Biblioteca para construir la interfaz de usuario. |
| **Node.js**   | Entorno de ejecución para el backend. |
| **Express.js** | Framework para la API REST. |
| **PostgreSQL** | Base de datos relacional alojada en Railway. |
| **Sequelize** | ORM para interactuar con PostgreSQL. |
| **DHTMLX Gantt** | Librería para gestionar y visualizar el diagrama de Gantt. |
| **Swagger**   | Herramienta para documentar y probar la API. |
| **Railway**   | Plataforma de hosting para el backend y la base de datos. |
| **Vercel**    | Plataforma de hosting para el frontend. |

---

## **📂 Estructura del Proyecto**  

El proyecto sigue el **modelo MVC** para una mejor organización.  

```bash
📂 Proyecto
 ├── 📁 client  # Aplicación en React con DHTMLX Gantt (Frontend)
 ├── 📁 app     # API en Node.js con Express (Backend)
 │    ├── 📁 config      # Configuración de la base de datos
 │    ├── 📁 docs        # Documentación con Swagger
 │    ├── 📁 src
 │    │    ├── 📁 models      # Modelos de la base de datos con Sequelize
 │    │    ├── 📁 routes      # Definición de rutas de la API
 │    │    ├── 📁 controllers # Lógica de negocio para CRUD
 │    ├── server.js     # Punto de entrada del backend
 ├── 📁 database  # Base de datos PostgreSQL alojada en Railway
```

---

## **🌐 Despliegue en Producción**  

- **Frontend (React) alojado en Vercel**: 🔗 [Enlace al Frontend](https://gantt-react-prueba-tecnica.vercel.app)  
- **Backend (API en Express) alojado en Railway**: 🔗 [Enlace al Backend](https://gantt-react-prueba-tecnica-production.up.railway.app/health/status)  
- **Documentación Swagger**: 🔗 [API Docs](https://gantt-react-prueba-tecnica-production.up.railway.app/api-docs/#/)  

---

## AÑADIDOS DESTACADOS 
- **Ahora puedes crear tareas principales en las tareas de proyectos predeterminados y a su vez crear subtareas dentro de las mismas.**
- **Puedes actualizar las fechas de cualquier tarea en el gantt usando el drag and drop mueve la tarea a donde quieras en el calendario y la fecha se actualiza automáticamente.**
- **Se agregaron limites a las fechas disponibles entre el 2023 y el 2026 para las tareas para acercarse algo mas a la realidad.**

---

## EJEMPLO DE USO 

Acontinuacion podras ver un ejemplo de uso del Gantt en el siguiente GIF, crear tareas, editar tareas y eliminarlas en tiempo real **(tambien puedes crear subtareas dentro de las tareas principales)**.

![Ejemplo de uso del Gantt](https://github.com/JoelRamos22/Gantt-React-Prueba-Tecnica/blob/test-branch/client/public/GIF%20prueba%20tecnica.gif)

---

## **📊 Base de Datos**  

Se utilizó **PostgreSQL**, alojado en **Railway**, con Sequelize como ORM.  

📌 **Modelo de Datos Principal (\`tasks\`)**  

| Campo      | Tipo           | Descripción |
|------------|--------------|-------------|
| \`id\`       | INTEGER (PK) | Identificador único de la tarea. |
| \`name\`     | STRING       | Nombre de la tarea. |
| \`startDate\` | STRING      | Fecha de inicio. |
| \`duration\`  | INTEGER     | Duración en días. |
| \`endDate\`   | STRING      | Fecha de finalización. |
| \`parentId\`  | INTEGER (FK) | Referencia a la tarea padre (subtareas). |

---

¡Gracias por revisar el proyecto! 🎉 🚀
