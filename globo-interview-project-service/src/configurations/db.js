


import * as tedious from 'tedious';

const Sequelize = require('sequelize');
const db = new Sequelize('globoinverviewdatabase', 'login123456', 'senha123456',{dialect:"mssql", dialectModule : tedious, host: "globoinverviewdatabase.database.windows.net"});

export {
    db
}

