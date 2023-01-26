//require an environment variable file to hold the login credentials for mySQL
require('dotenv').config();
//this is the sequelise connection settings

// require sequelise
const Sequelize = require('sequelize');

//sequelize settings
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
      host: 'localhost',
      dialect: 'mysql',
      dialectOptions: {
        decimalNumbers: true,
      },
    });

    //export these settings
    
module.exports = sequelize;
