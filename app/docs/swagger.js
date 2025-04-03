const swaggerJsdoc = require('swagger-jsdoc');

/**
 * * Configuración de la documentación de Swagger
*/

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API para actividades',
            version: '1.0.0',
            description: 'API para manejo de actividades sobre proyectos con sus tareas y subtareas.',
            contact: {
                name: 'German Joel Ramos'
            }
        },
        servers: [
            {
                url: 'https://gantt-react-prueba-tecnica-production.up.railway.app',
                description: 'Produccion Server'
            },
            {
                url: 'http://localhost:3000',
                description: 'Local server'
            }
        ]
    },
    apis: ['./src/routes/*.js']
};

const specs = swaggerJsdoc(options);

module.exports = specs;
