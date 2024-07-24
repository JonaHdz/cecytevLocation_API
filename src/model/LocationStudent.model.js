require('dotenv').config();
const passwordConnection = process.env.SQL_PASS;
const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize ('sige', 'jonadmin', passwordConnection, { host: 'localhost', dialect: 'postgres' });

class LocationStudent extends Model { }

LocationStudent.init(
    {
        idLocationStudent: {
            type: DataTypes.STRING,
            primaryKey: true,
            autoIncrement: false
        },
        dateLocation: {
            type: DataTypes.DATE,
            allowNull: false
        },
        idStudent: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        latitudeStudent: {
            type: DataTypes.STRING,
            allowNull: false
        },
        longitudeStudent: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        sequelize,
        modelName: "LocationStudents",
        timestamps: false
    }
);

module.exports = LocationStudent;