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