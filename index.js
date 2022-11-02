// import npm packages for usage
const fs = require('fs');
const mysql = require('mysql2');
const cTable = require('console.table');
const { default: inquirer } = require('inquirer');

// connect to the mysql database
const connection = mysql.createConnection({
    host: 'localhost',
    port: '3001',
    user: 'root',
    password: 'password',
    database: 'employee_db'
});

// function for initial prompt, asking user to make a choice between the features
const employeeTracker = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'firstChoice',
            message: 'What would you like to do?',
            // all available choices for use in this application
            choices: [
                'View all Employees',
                'View Departments',
                'View Roles',
                'Add an Employee',
                'Add a Department',
                'Add a Role',
                'Update an Employee Role',
                'Exit'
            ]
        }
    ])
}