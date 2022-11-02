-- freshly creates a new database, dropping the old one if needed
DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

-- select which database tables will be generated on
USE employee_db;

-- create 3 tables, all of which needed to keep track of different data
-- department table first
CREATE TABLE department(
    id INT AUTO_INCREMENT PRIMARY KEY,
    dept_name VARCHAR(30)
);

-- then role table, whose department_id is connected via foreign key to department's id
CREATE TABLE roles(
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id) -- foreign key
    REFERENCES department(id) -- taken from id in the department table
);

-- and lastly employee table, whose role_id is in reference to a role's id, and manager_id is in reference to another employee's id
CREATE TABLE employee(
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    FOREIGN KEY (role_id) -- foreign key
    REFERENCES roles(id), -- taken from id in the role table
    manager_id INT NULL,
    FOREIGN KEY (manager_id) -- foreign key
    REFERENCES employee(id) -- taken from id in the employee table
);