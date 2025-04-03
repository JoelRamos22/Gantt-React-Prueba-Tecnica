require('dotenv').config(); 
const swaggerUi = require('swagger-ui-express');
const specs = require('./docs/swagger.js');
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const healthRoutes = require('./src/routes/health');
const taskRoutes = require('./src/routes/TaskRoute');

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
 * * Conectar con la base de datos y arrancar el servidor
 */
(async () => {
    try {
        await sequelize.authenticate(); 
        console.log("✅ Conexión a PostgreSQL exitosa.");
        
        await sequelize.sync({ alter: true }); 
        console.log("📦 Base de datos conectada y sincronizada");

        app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
    } catch (error) {
        console.error("❌ Error al conectar la base de datos:", error);
        process.exit(1); 
    }
})();

