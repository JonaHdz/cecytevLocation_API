require('dotenv').config();
const passwordConnection = process.env.SQL_PASS;
const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize ('sige', 'jonadmin', passwordConnection, { host: 'localhost', dialect: 'postgres' });


class Estudiante extends Model {}
Estudiante.init(
    {
        matricula: {
            type: DataTypes.STRING,
            primaryKey: true,
            autoIncrement: false
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        appaterno: {
            type: DataTypes.STRING,
            allowNull: false
        },
        apmaterno: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ultimosemestre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        contrasena: {
            type: DataTypes.STRING,
            allowNull: false
        },
        telefono: {
            type: DataTypes.STRING,
            allowNull: false
        },

    },
    {
        sequelize,
        modelName: "alumnos",
        tableName: "alumnos",
        timestamps: false
    }
);

module.exports = Estudiante;