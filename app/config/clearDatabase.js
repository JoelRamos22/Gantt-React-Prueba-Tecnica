require('dotenv').config({ path: '../.env' });

const { Sequelize } = require('sequelize');

console.log("URL de la base de datos:", process.env.DATABASE_URL);

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false,
});

async function clearDatabase() {
    try {
        await sequelize.authenticate();
        console.log("✅ Conexión a PostgreSQL exitosa.");

        const queryInterface = sequelize.getQueryInterface();
        
        // Borrar todas las tablas
        await queryInterface.dropAllTables();
        console.log("🔥 Base de datos vaciada correctamente.");

    } catch (error) {
        console.error("❌ Error al vaciar la base de datos:", error);
    } finally {
        await sequelize.close();
    }
}

clearDatabase();



