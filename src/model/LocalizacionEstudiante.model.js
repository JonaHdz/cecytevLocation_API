require('dotenv').config();
const passwordConnection = process.env.SQL_PASS;
const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize ('sige', 'jonadmin', passwordConnection, { host: 'localhost', dialect: 'postgres' });

class LocalizacionEstudiante extends Model { }

LocalizacionEstudiante.init(
    {
        idLocalizacionEstudiante: {
            type: DataTypes.STRING,
            primaryKey: true,
            autoIncrement: false
        },
        fechaRegistro: {
            type: DataTypes.STRING,
            allowNull: false
        },
        matricula: {
            type: DataTypes.STRING,
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
        tableName: "localizacionEstudiante",
        timestamps: false
    }
);

module.exports = LocalizacionEstudiante;