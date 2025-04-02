const swaggerUi = require('swagger-ui-express');
const specs = require('./docs/swagger.js');


const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const projectRoutes = require('./src/routes/ProjectActivityRoute');
const healthRoutes = require('./src/routes/health');
const taskRoutes = require('./src/routes/TaskRoute');
// const subTaskRoutes = require('./routes/subTaskRoutes');

const app = express();
app.use(cors())
app.use(express.json());

// Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Rutas
app.use('/projects', projectRoutes);
app.use('/health', healthRoutes);
app.use('/tasks', taskRoutes);
// app.use('/api/subtasks', subTaskRoutes);

// Sincronizacion con la base de datos
sequelize.sync({ alter: true }).then(async () => {
  console.log("📦 Base de datos conectada y sincronizada");
  app.listen(3000, () => console.log("🚀 Servidor corriendo en http://localhost:3000"));
});
