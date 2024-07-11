const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = new Sequelize('cecytevlocationdb', 'root', 'minecraftPE1976',
     {
    host: 'localhost',
    dialect: 'mysql'
});

class Teacher extends Model { }

Teacher.init({
        idTeacher: {
            type: DataTypes.STRING,
            primaryKey: true,
            autoIncrement: false
        },
        nameTeacher: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastnameTeacher: {
            type: DataTypes.STRING,
            allowNull: false
        },
        passwordTeacher: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        sequelize,
        modelName: "Teacher",
        timestamps: false
    }
);

module.exports = Teacher;