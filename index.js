// import npm packages for usage
const fs = require('fs');
const mysql = require('mysql2');
const cTable = require('console.table');
const { default: inquirer } = require('inquirer');

// empty arrays for use when adding new roles and arrays later
const rolesArr = [];
const employeesArr = [];

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

            case 'Exit':
                return;
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
    INNER JOIN department ON department.id = role.department_id`;
    connection.query(query, (err, res) => {
        if (err) throw err; // checks for error first
        console.log("Viewing all Employees");
        cTable(res); // generates visible table from data gathered
        employeeTracker(); // returns back to available choices
    });
}

// view all departments, based on second option from prompt
const viewDepartments = () => {
    // selects name from department table
    const query = `SELECT department.name`;
    connection.query(query, (err, res) => {
        if (err) throw err; // checks for error first
        console.log("Viewing all Departments");
        console.table(res); // generates visible table from data gathered
        employeeTracker(); // returns back to available choices
    });
}

// view all roles, based on third option from prompt
const viewRoles = () => {
    rolesArr = []; // resets roles array so duplicate roles aren't added
    const query = `SELECT role.title`; // selects title from role table
    connection.query(query, (err, res) => {
        if (err) throw err; // checks for error first
        res.forEach(({ title }) => {
            rolesArr.push(title); // updates the roles array to include all role titles
            console.log('Viewing all Roles');
            console.table(res); // generates visible table from data gathered
            employeeTracker(); // returns back to available choices
        });
    });
}

// add a new employee to the database and generate a new employee table to reflect change
const addEmployee = () => {
    inquirer.prompt([ // prompt that has user fill in information for new employee
        {
            type: 'input',
            message: "What is the employee's first name?",
            name: 'firstName'
        },
        {
            type: 'input',
            message: "What is the employee's last name?",
            name: 'lastName'
        },
        {
            type: 'input',
            message: "What is the employee's role ID?",
            name: 'roleId'
        },
        {
            type: 'input',
            message: "What is the employee's manager's ID?",
            name: 'managerId'
        }
    ]).then((answers) => {
        connection.query(`INSERT INTO employee SET ?`, // insert information from prompt into table
            {
                first_name: answers.firstName,
                last_name: answers.lastName,
                role_id: answers.roleId,
                manager_id: answers.managerId
            },
            (err) => {
                if (err) throw err; // checks for error first
                console.log('Added new Employee');
                console.table(answers); // generates visible table from data gathered
                employeeTracker(); // returns back to available choices
            });
    });
}

// add a new department to the database and generate a new department table to reflect change
const addDepartment = () => {
    inquirer.prompt([ // prompt that asks user to create a department
        {
            type: 'input',
            message: 'What Department will you add?',
            name: 'newDepartment'
        }
    ]).then((answers) => {
        connection.query(`INSERT INTO department SET ?`, // insert information from prompt into department table
            {
                name: answers.newDepartment
            },
            (err) => {
                if (err) throw err; // checks for error first
                console.log('Added new Department');
                console.table(answers); // generates visible table from data gathered
                employeeTracker(); // returns back to available choices
            });
    });
}

// add a new role to the database and generate a new roles table to reflect change
const addRole = () => {
    inquirer.prompt([ // prompt that asks user to create a role, and denote what the salary of that role is
        {
            type: 'input',
            message: 'What Role will you add?',
            name: 'newRole'
        },
        {
            type: 'input',
            message: "What is the Role's salary?",
            name: 'salary'
        },
        {
            type: 'input',
            message: "What is the department ID that the Role belongs to?",
            name: 'departmentId'
        }
    ]).then((answers) => {
        connection.query(`INSERT INTO employee_Role SET ?`, // insert information from prompt into role table
            {
                title: answers.newRole,
                salary: answers.salary,
                department_id: answers.departmentId
            },
            (err) => {
                if (err) throw err; // checks for error first
                console.log('Added new Role');
                console.table(answers); // generates visible table from data gathered
                employeeTracker(); // returns back to available choices
            });
    });
}

// automatically opens up the employee tracker application upon starting
employeeTracker();
