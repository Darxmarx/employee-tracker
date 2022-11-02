// import npm packages for usage
const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');

// empty arrays for use when adding new roles and arrays later
let rolesArr = [];
let employeesArr = [];

// connect to the mysql database
const connection = mysql.createConnection({
    user: 'root',
    password: 'password',
    database: 'employee_db'
});

// function for initial prompt, asking user to make a choice between the features
function employeeTracker() {
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
        switch (answer.firstChoice) {
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
            message: "What is the Employee's first name?",
            name: 'firstName'
        },
        {
            type: 'input',
            message: "What is the Employee's last name?",
            name: 'lastName'
        },
        {
            type: 'input',
            message: "What is the Employee's role ID?",
            name: 'roleId'
        },
        {
            type: 'input',
            message: "What is the Employee's manager's ID?",
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

// update a specific employee's role in the database, creating a table to reflect the change
const updateEmployeeRole = () => {
    inquirer.prompt([ // prompt that asks user to choose an employee, and what role that employee will be given
        {
            type: 'list',
            message: 'Which Employee would you like to update?',
            choices: employeesArr,
            name: 'employee'
        },
        {
            type: 'list',
            message: 'What will the new Role be?',
            choices: rolesArr,
            name: 'newRole'
        }
    ]).then((answers) => {
        connection.query(`UPDATE role SET title = ? WHERE first_name = ?`, // insert information from prompt into new table
            {
                title: answers.newRole,
                first_name: answers.employee
            },
            (err) => {
                if (err) throw err; // checks for error first
                console.log("Updated Employee's Role");
                console.table(answers); // generates visible table from data gathered
                employeeTracker(); // returns back to available choices
            });
    });
}

// set up arrays for updateEmployeeRole and newEmployee
employeesArr = [];
const query = 'SELECT employee.first_name';
connection.query(query, (err, res) => {
    if (err) throw err;
    res.forEach(({ first_name }) => {
        employeesArr.push(first_name);
    });
});
rolesArr = [];
const query2 = `SELECT role.title`
connection.query(query2, (err, res) => {
    if (err) throw err;
    res.forEach(({ title }) => {
        rolesArr.push(title);
    });
});

// starts up the employeeTracker() immediately
function startup() {
    employeeTracker();
}
startup();