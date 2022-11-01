-- freshly creates a new database, dropping the old one if needed
DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

-- select which database tables will be generated on
USE employee_db;

-- create 3 tables, all of which needed to keep track of different data
-- department table first
CREATE TABLE department(
    id: INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name: VARCHAR(30)
);

-- then role table, whose department_id is connected via foreign key to department's id
CREATE TABLE role(
    id: INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    title: VARCHAR(30),
    salary: DECIMAL NOT NULL,
    department_id: INT NOT NULL,
    FOREIGN KEY (department_id) -- foreign key
    REFERENCES department(id) -- taken from id in the department table
    ON DELETE SET NULL
);

-- and lastly employee table, whose role_id is in reference to a role's id, and manager_id is in reference to another employee's id
CREATE TABLE employee(
    id: INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    first_name: VARCHAR(30),
    last_name: DECIMAL NOT NULL,
    role_id: INT NOT NULL,
    manager_id: INT NOT NULL,
    FOREIGN KEY (role_id) -- foreign key
    REFERENCES role(id) -- taken from id in the role table
    ON DELETE SET NULL
    FOREIGN KEY (manager_id) -- foreign key
    REFERENCES employee(id) -- taken from id in the employee table
    ON DELETE SET NULL
);