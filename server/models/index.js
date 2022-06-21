const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env]; 
const Sequelize = require("sequelize");
let sequelize;
if (process.env.NODE_ENV === 'production') {
sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
}
);

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
} else {

    sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    operatorsAliases: '0',
    pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle
    }
});
}
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.colors = require("./color.model.js")(sequelize, Sequelize);
module.exports = db;