const swaggerUi = require('swagger-ui-express');
const specs = require('./docs/swagger.js');
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const projectRoutes = require('./src/routes/ProjectActivityRoute');
const healthRoutes = require('./src/routes/health');
const taskRoutes = require('./src/routes/TaskRoute'); // 🔹 SubTaskRoute ya no es necesario

const app = express();
app.use(cors());
app.use(express.json());

// 📌 Documentación con Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// 📌 Rutas de la API
app.use('/projects', projectRoutes);
app.use('/health', healthRoutes);
app.use('/tasks', taskRoutes); // 🔹 Maneja tanto tareas como subtareas ahora

// 📌 Sincronización con la base de datos
sequelize.sync({ alter: true }) // 🔹 `alter: true` para actualizar sin perder datos
  .then(() => {
    console.log("📦 Base de datos conectada y sincronizada");
    app.listen(3000, () => console.log("🚀 Servidor corriendo en http://localhost:3000"));
  })
  .catch(error => console.error("❌ Error al sincronizar la base de datos:", error));
