const Sequelize = require('sequelize')

const globoDbConfig = new Sequelize({
    dialect: 'sqlite',
    storage: './globo_interview_project_db.sqlite'

});

module.exports = globoDbConfig;

