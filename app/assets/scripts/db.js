const mysql = require('mysql');

const dbpool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'user',
  password: 'pa55w0rd',
  database: 'KidSport_1'
});

module.exports = dbpool;
