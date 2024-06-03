-- Query 1: Select all employees and their roles
SELECT 
    employees.first_name, 
    employees.last_name, 
    role.title AS role_title
FROM 
    employees
JOIN 
    role ON employees.role_id = role.id;

-- Query 2: Select all employees and their managers
SELECT 
    employees.first_name AS employee_first_name, 
    employees.last_name AS employee_last_name, 
    managers.first_name AS manager_first_name, 
    managers.last_name AS manager_last_name
FROM 
    employees
LEFT JOIN 
    employees AS managers ON employees.manager_id = managers.id;

-- Query 3: Select the average salary for each department
SELECT 
    department.name AS department_name, 
    AVG(role.salary) AS average_salary
FROM 
    department
JOIN 
    role ON department.id = role.department_id
GROUP BY 
    department.name;
