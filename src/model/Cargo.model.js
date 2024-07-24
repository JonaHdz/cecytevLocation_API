require('dotenv').config();
const passwordConnection = process.env.SQL_PASS;
const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize ('sige', 'jonadmin', passwordConnection, { host: 'localhost', dialect: 'postgres' });

class Cargo extends Model {}

Cargo.init(
    {
        idcargo: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: false
        },
        cargo: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        sequelize,
        modelName: "cargo",
        tableName: "cargo",
        timestamps: false
    }
);

module.exports = Cargo;