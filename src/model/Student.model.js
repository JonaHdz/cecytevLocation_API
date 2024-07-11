const { Sequelize, DataTypes, Model } = require('sequelize')
const sequelize = new Sequelize('cecytevlocationdb', 'root', 'minecraftPE1976', {
    host: 'localhost',
    dialect: 'mysql'
});


class Student extends Model {}
Student.init(
    {
        idStudent: {
            type: DataTypes.STRING,
            primaryKey: true,
            autoIncrement: false
        },
        nameStudent: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastNameStudent: {
            type: DataTypes.STRING,
            allowNull: false
        },
        year: {
            type: DataTypes.STRING,
            allowNull: false
        },
        passwordStudent: {
            type: DataTypes.STRING,
            allowNull: false
        },
        telephoneTutor: {
            type: DataTypes.STRING,
            allowNull: false
        },

    },
    {
        sequelize,
        modelName: "Student",
        timestamps: false
    }
);

module.exports = Student;