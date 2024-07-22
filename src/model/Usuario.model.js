require('dotenv').config();
const passwordConnection = process.env.SQL_PASS;
const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize ('sige', 'postgres', passwordConnection, { host: 'localhost', dialect: 'postgres' });

class Usuario extends Model { }

Usuario.init({
        email: {
            type: DataTypes.STRING,
            primaryKey: true,
            autoIncrement: false
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        idcargo: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        sequelize,
        modelName: "usuarios",
        timestamps: false
    }
);

module.exports = Usuario;