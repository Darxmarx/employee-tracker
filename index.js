// import npm packages for usage
const fs = require('fs');
const mysql = require('mysql2');
const cTable = require('console.table');

// connect to the mysql database
const connection = mysql.createConnection({
    host: 'localhost',
    port: '3001',
    user: 'root',
    password: 'password',
    database: 'employee_db'
});

