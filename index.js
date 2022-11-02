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
    ]).then((answer) => { // after user selects an answer from available choices...
        switch (answer.employeeChoice) {
            // plays out specific functions based on which answer was chosen
            case 'View all Employees':
                viewEmployees();
                break;

            case 'View Departments':
                viewDepartments();
                break;

            case 'View Roles':
                viewRoles();
                break;

            case 'Add an Employee':
                addEmployee();
                break;

            case 'Add a Department':
                addDepartment();
                break;

            case 'Add a Role':
                addRole();
                break;

            case 'Update an Employee Role':
                updateEmployeeRole();
                break;
        }
    });
}