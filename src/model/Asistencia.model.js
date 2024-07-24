require('dotenv').config();
const passwordConnection = process.env.SQL_PASS;
const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize ('sige', 'jonadmin', passwordConnection, { host: 'localhost', dialect: 'postgres' });

class Asistencia extends Model { }

Asistencia.init(
    {
        idAsistencia: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: false
        },
        fechaAsistencia: {
            type: DataTypes.DATE,
            allowNull: false
        },
        tipoAsistencia: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        matricula: {
            type: DataTypes.STRING,
            allowNull: false
        },
        emailDocente: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        sequelize,
        modelName: "Asistencia",
        timestamps: false
    }
);


module.exports = Asistencia;    