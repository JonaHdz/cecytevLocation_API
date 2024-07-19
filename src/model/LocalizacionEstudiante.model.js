require('dotenv').config();
const passwordConnection = process.env.SQL_PASS;
const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize ('sige', 'postgres', passwordConnection, { host: 'localhost', dialect: 'postgres' });

class LocalizacionEstudiante extends Model { }

LocalizacionEstudiante.init(
    {
        idLocalizacionEstudiante: {
            type: DataTypes.STRING,
            primaryKey: true,
            autoIncrement: false
        },
        fechaRegistro: {
            type: DataTypes.DATE,
            allowNull: false
        },
        matricula: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        latitud: {
            type: DataTypes.STRING,
            allowNull: false
        },
        longitud: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        sequelize,
        modelName: "localizacionEstudiante",
        timestamps: false
    }
);

module.exports = LocalizacionEstudiante;