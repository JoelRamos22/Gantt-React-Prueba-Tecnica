require('dotenv').config(); 
const swaggerUi = require('swagger-ui-express');
const specs = require('./docs/swagger.js');
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const healthRoutes = require('./src/routes/health');
const taskRoutes = require('./src/routes/TaskRoute');
const Task = require ('./src/models/Task');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

/**
 * * Ruta a la documentación de Swagger
 */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

/**
 * * Rutas de la API
 */
app.use('/health', healthRoutes);
app.use('/tasks', taskRoutes);


/**
 * * Cargar proyectos basicos en la base de datos
 */
async function insertDefaultProjectsAsTasks() {
    try {
        const projects = [
            { name: "Proyecto A", startDate: "2024-02-05 00:00", duration: 10, endDate: "2024-04-11 23:59" },
            { name: "Proyecto B", startDate: "2024-02-05 00:00", duration: 15, endDate: "2024-04-20 23:59" },
            { name: "Proyecto C", startDate: "2024-02-05 00:00", duration: 20, endDate: "2024-04-30 23:59" },
            { name: "Proyecto D", startDate: "2024-02-05 00:00", duration: 25, endDate: "2024-05-10 23:59" },
        ];

        for (const project of projects) {
            const existingTask = await Task.findOne({ where: { name: project.name } });

            if (!existingTask) {
                await Task.create({
                    name: project.name,
                    startDate: project.startDate,
                    duration: project.duration,
                    endDate: project.endDate,
                    parentId: null,
                });
                console.log(`✅ Tarea '${project.name}' insertada.`);
            } else {
                console.log(`🔹 La tarea '${project.name}' ya existe, no se insertó.`);
            }
        }
    } catch (error) {
        console.error("❌ Error insertando tareas 'proyecto':", error);
    }
}


/**
 * * Conectar con la base de datos y arrancar el servidor
 */
(async () => {
    try {
        await sequelize.authenticate(); 
        console.log("✅ Conexión a PostgreSQL exitosa.");
        
        await sequelize.sync({ alter: true }); 
        console.log("🔹 Base de datos sincronizada.");

        await insertDefaultProjectsAsTasks();  

        app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
    } catch (error) {
        console.error("❌ Error al conectar la base de datos:", error);
        process.exit(1); 
    }
})();

