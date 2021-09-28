
const Sequelize = require('sequelize');
const database = require('../configurations/db');

const userModel = database.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    levelAccess: {
        type: Sequelize.ENUM("Administrador" ,"Funcionário"),
        defaultValue:"Administrador",
        allowNull:false
    }
})

module.exports = userModel;