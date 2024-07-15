require('dotenv').config();
const passwordConnection = process.env.SQL_PASS;
const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize ('cecytevlocationdb', 'root', passwordConnection, { host: 'localhost', dialect: 'mysql' }); 

class Attendance extends Model { }

Attendance.init(
    {
        idAttendances: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: false
        },
        dateAttendance: {
            type: DataTypes.DATE,
            allowNull: false
        },
        typeAttendance: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        idStudent: {
            type: DataTypes.STRING,
            allowNull: false
        },
        idTeacher: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        sequelize,
        modelName: "Attendances",
        timestamps: false
    }
);


module.exports = Attendance;    