const mysql = require('mysql');
var Promise = require('bluebird');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'laravel9',
    multipleStatements: true
})

var connAsync = Promise.promisify(conn.query.bind(conn));
conn.connect();

module.exports = connAsync;
