-- Seed departments
INSERT INTO department (name) VALUES
    ('Sales'),
    ('Marketing'),
    ('Finance');

-- Seed roles
INSERT INTO role (title, salary, department_id) VALUES
    ('Sales Representative', 50000, 1),
    ('Marketing Coordinator', 55000, 2),
    ('Financial Analyst', 60000, 3);

-- Seed employees
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
    ('Gary', 'Smith', 1, NULL),
    ('Alex', 'Green', 2, NULL),
    ('Jimmy', 'Williams', 3, NULL),
    ('Leslie', 'Baker', 1, NULL),
    ('Kathy', 'Daniels', 2, NULL);
