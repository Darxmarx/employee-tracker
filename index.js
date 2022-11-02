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

// view all employees, based on first option from prompt
const viewEmployees = () => {
    // selects all elements from the specified tables 
    const query = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, CONCAT(manager.first_name,'', manager.last_name) AS manager
    FROM employee 
    LEFT JOIN employee manager ON manager.id = employee.manager_id
    INNER JOIN role ON employee.role_id = role.id
    INNER JOIN department ON department.id = role.department_id;`
    connection.query(query, (err, res) => {
        if (err) throw err; // checks for error first
        console.log("Viewing all employees");
        cTable(res); // generates visible table from data gathered
        employeeTracker(); // returns back to available choices
    });
}
// automatically opens up the employee tracker application upon starting
employeeTracker();
