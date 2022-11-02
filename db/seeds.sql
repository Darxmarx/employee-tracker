-- two tests for department table
INSERT INTO department (dept_name)
VALUES
    ('Service'),
    ('Sales')
;

-- four tests for role table
INSERT INTO roles (title, salary, department_id)
VALUES
    ('Sales leader', 1500, 2),
    ('Salesperson', 950, 2),
    ('Accountant', 1300, 1),
    ('Intern', 100, 1)
;

-- four tests for employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Kirby', 'Friendperson', 1, NULL), -- no manager
    ('King', 'Dedede', 2, 1),
    ('Waddle', 'Doo', 3, 1),
    ('Meta', 'Knight', 4, 1)
;