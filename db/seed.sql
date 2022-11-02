-- two tests for department table
INSERT INTO department (name)
VALUES
    ('Service'),
    ('Sales');

-- four tests for role table
INSERT INTO role (title, salary, department_id)
    ('Sales leader', 1500.50, 2),
    ('Salesperson', 950.25, 2),
    ('Accountant', 1300.00, 1),
    ('Intern', 100.42, 1);

-- four tests for employee table
INSERT INTO employee(first_name, last_name, role_id, manager_id)
    ('Kirby', 'Friendperson', 37, NULL), -- no manager
    ('King', 'Dedede', 38, 1),
    ('Waddle', 'Dee', 39, 2),
    ('Meta', 'Knight', 40, NULL) -- no manager