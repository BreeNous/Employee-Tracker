const { prompt } = require("inquirer");
const db = require("./db");
const pool = require("./db/connections");

init();
 
// Display logo text, load main prompts
function init() {
  loadMainPrompts();
}

// MAIN PROPMT (MAIN PROMPT START)

function loadMainPrompts() {
  prompt([
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'option',
        choices: ['Add', 'View', 'Update', 'Delete', 'Exit' ]    
    }

  ]).then((res) => {

// PROMPT TO HANDLE WHAT TO DO FOR EACH CHOICE A USER MAKES (START)
   
    switch (res.option) {
        case 'Add': 
            addPrompt();
            break;
        case 'View':
            viewPrompt();
            break;
        case 'Update':
            updatePrompt();
            break;
        case 'Delete':
            deletePrompt();
            break;
        case 'Exit':
            quit();
            break;
        default:
            console.log("Invalid Option");
        }
    })
  };

  // (END) 
  
  // (MAIN PROMPT END)

  // PROPMT FOR WHEN USER WANTS TO ADD SOMETHING (START)

  function addPrompt(){
    prompt([
        {
            type:'list',
            message:'What do you want to add to?',
            name:'add',
            choices: ['Department', 'Role', 'Employee'
            ]
        }
    ]).then((res) => {
        switch (res.add) {
            case 'Department':
                addDepartment();
                break;
            case 'Role':
                addRole();
                break;
            case 'Employee':
                addEmployee();
                break;
            default:
                console.log("Invalid Option");
        }
    })
  };

// (END)

// PROMPT FOR USER TO CHOOSE WHAT TO VIEW (START)

  function viewPrompt() {
    prompt([
        {
        type:'list',
        message: 'What would you like to do?',
        name: 'view',
        choices: ['View all employees', 'View all roles', 'View all departments', 'View all employees except chosen ID']
        }
    ]).then((res) => {
        switch(res.view) {
        case 'View all employees':
            viewAllEmployees();
            break;
        case 'View all roles':
            viewAllRoles();
            break;
        case 'View all departments':
            viewAllDepartments();
            break;
        case 'View all employees except chosen ID':
            viewAllExcept();
            break;
        default:
            console.log("Invalid option");
        }
    })
  };

 // (END) 

// PROMPT FOR USER TO CHOOSE WHAT TO UPDATE (START)

  function updatePrompt() {
    prompt ([
        {
        type: 'list',
        message: 'What do you want to update?',
        name: 'update',
        choices: ['Update employee', 'Update role', 'Update department']
        }
    ]).then(res => {
        switch (res.update) {
            case 'Update employee':
                updateEmployee();
                break;
            case 'Update role':
                updateRole();
                break;
            case 'Update department':
                updateDepartment()
                break;
            default:
                console.log("Invalid Option");

        }
    })
  };

 // (END) 

// PROMPT FOR USER TO CHOOSE WHAT THEY WISH TO DELETE (START)
  
function deletePrompt() {
  prompt([
    {
        type: 'list',
        message: 'What do you want to delete?',
        name: 'delete',
        choices: ['Employee', 'Role', 'Department']    
    }

  ]).then((res) => {    
    switch (res.delete) {
        case 'Employee': 
            deleteEmployee();
            break;
        case 'Role':
            deleteRole();
            break;
        case 'Department':
            deleteDepartment();
            break;
            default:
            console.log("Invalid Option");
        }
    })
  };

// (END)

// HANDLES WHEN USER CHOSES TO VIEW (VIEW OPTION START)

// LETS USER VIEW ALL THE EMPLOYEES IN A TABLE (START)

const viewAllEmployees = async ()=> {
    let { rows } = await db.findAllEmployees();
    console.log('\n');
    console.table(rows);
    loadMainPrompts();
};

// (END)

// LETS USER VIEW ALL EMPLOYEES EXCEPT THE SELECTION (START)

const viewAllExcept = async () => {
    const exempt = await fetchEmployees();
    let {allExceptId} = await prompt([
        {
            type: 'list',
            name: 'allExceptId',
            message: 'What employee do you want to exempt?',
            choices: exempt
        }
    ])
    let { rows } = await db.selectExcept(allExceptId);
    console.log('\n');
    console.table(rows);
    loadMainPrompts();
}

// (END)

// LETS USER VIEW ALL ROLES (START)
const viewAllRoles = async ()=> {
    let { rows } = await db.findAllRoles();
    console.log('\n');
    console.table(rows);
    loadMainPrompts();
};

// (END)

// LETS USER VIEW ALL DEPARTMENTS (START)

const viewAllDepartments = async ()=> {
    let { rows } = await db.findAllDepartments();
    console.log('\n');
    console.table(rows);
    loadMainPrompts();
};
  const addDepartment = async () => {
    let {newDepartment} = await prompt([
        {
            name: 'newDepartment',
            message: 'What is the department called?'            
        }
    ])
let { rows } = await db.inputDepartment(newDepartment);
console.log("Department added");
loadMainPrompts();
};

// (END) 

// (VIEW OPTION END)

// HANDLES WHEN USER CHOSES TO ADD (ADD OPTION START)

// LETS USER ADD A ROLE (START)

  const addRole = async () => {    
        const departments = await fetchDepartments();
    let {newRole, newSalary, department} = await prompt ([
        {
            name: 'newRole',
            message: 'What is the role called?'
        },
        {
            name: 'newSalary',
            message: 'How much does this role make?'
        },
        {
            type: 'list',
            name: 'department',
            message: 'What department is this role in?',
            choices: departments
        }           
    ]);
    const departmentId = await fetchDepartmentId(department);
    let { rows } = await db.inputRole(newRole, newSalary, departmentId);
    console.log("Role added");
    loadMainPrompts();
};

// (END)

// LETS USER ADD AN EMPLOYEE (START)

  const addEmployee = async () => {
    const roles = await fetchRoles(); 
    
    let {newFirst, newLast, newEmpRole} = await prompt ([

        {
            name: 'newFirst',
            message: 'What is the new employees first name?'
        },
        {
            name: 'newLast',
            message: 'What is the new employees last name?'
        },
        {
            type: 'list',
            name: 'newEmpRole',
            message: 'What role is the new employee in?',
            choices: roles
        }
    ])
    await db.inputEmployee(newFirst, newLast, newEmpRole);
    console.log("Employee added");
    loadMainPrompts();
};

// (END)

// (ADD OPTION END)

// HANDLES WHAN A USER UPDATES SOMETHING (UPDATE OPTION START)

// LETS USER UPDATE A DEPARTMENT (START)

const updateDepartment = async () => {
    const departments = await fetchDepartments();
    let {updatedDepartment, department} = await prompt ([
        {
            type: 'list',
            name: 'department',
            message: 'What department do you want to update?',
            choices: departments
        },
        {
            name: 'updatedDepartment',
            message: 'What do you want to change this department name to?'
        }
    ]);
    const departmentId = await fetchDepartmentId(department);
    let { rows } = await db.changeDepartment(updatedDepartment, departmentId);
    console.log("Department Updated");
    loadMainPrompts();
};

// (END)

// LETS USER UPDATE A ROLE (START)

const updateRole = async () => {
    try {
        const roles = await fetchRoles(); 
        console.log(roles);       
        
        const { roleId } = await prompt([
            {
                type: 'list',
                name: 'roleId',
                message: 'Select a role to update:',
                choices: roles
            }
        ]);

        const {updatedRole, salary} = await prompt([
            {
                name: 'updatedRole',
                message: 'Enter the updated role name:'
            },
            {
                name: 'salary',
                message: 'Enter the updated salary:'
            }
        ]);

        const departmentId = await fetchDepartmentId(roles);
        let { rows } = await db.changeRole(updatedRole, salary, roleId);     
        console.log(updatedRole);
        console.log(departmentId);
        console.log("Role updated successfully.");
        loadMainPrompts();
    } 
    
    catch (error) {
        console.error('Error updating role:', error);
    }
};

// (END)

// LETS USER UPDATE AN EMPLOYEE (START)

const updateEmployee = async () => {
    const employees = await fetchEmployees();
    const roles = await fetchRoles();  
    let { Employee, role } = await prompt ([
        {
            type:'list',
            name: 'Employee',
            message: 'What employee do you want to change the role of?',
            choices: employees
        },
        {   
            type: 'list',
            name: 'role',
            message: 'What role will this employee be in?',
            choices: roles
        }        
    ]);   
    let { rows } = await db.changeEmployee(role, Employee);
        console.log("Employee Updated");
        loadMainPrompts();
};

// (END)

// (UPDATE OPTION END)

// HANDLES WHEN USER CHOSES TO DELETE (DELETE OPTION START)

// LETS USER DELETE A DEPARTMENT (START)

const deleteDepartment = async () => {
        const departments = await fetchDepartments();
        let { department } = await prompt ([
            {
                type: 'list',
                name: 'department',
                message: 'What department do you want to delete?',
                choices: departments
            }
        ])
        let { rows } = await db.removeDepartment(department);
        console.log("Department Deleted");
        loadMainPrompts();
};

// (END)

// LETS USER DELETE A ROLE (START)

const deleteRole = async () => {
    const roles = await fetchRoles();
    let {role} = await prompt ([
        {
            type: 'list',
            name: 'role',
            message: 'What role do you want to delete?',
            choices: roles
        }       
    ]);
    let { rows } = await db.removeRole(role);
    console.log(`Role deleted`);
    loadMainPrompts();
};

// (END)

// LETS USER DELETE A SINGLE EMPLOYEE (START)

const deleteEmployee = async () => {
    const employees = await fetchEmployees();
    let {employee} = await prompt ([
        {
            type: 'list',
            name: 'employees',
            message: 'What employee do you want to delete?',
            choices: employees
        }        
    ]);
    let { rows } = await db.removeEmployee(employee);
    console.log(`Employee deleted`);
    loadMainPrompts();    
};

// (END)

// HANDLES GETTING THE USER CHOICE REQUESTED DATA (GET DATA START)

// GETS ALL DEPARTMENTS AND DEPARTMENT IDS FOR DISPLAY (START)

  function fetchDepartments() {
    return new Promise((resolve, reject) => {
      pool.query('SELECT department_name, department_id FROM department', (error, results) => {
        if (error) {
          reject(error);
        } else {
            if (results.rows.length > 0) {
          resolve(results.rows.map(({department_name, department_id}) => ({
            name: department_name,
            value: department_id
          })));
        }
    }
    });
});
};

// (END)

// GETS A SINGLE DEPARTMENT ID FOR DISPLAY (START)

async function fetchDepartmentId() {
    return new Promise ((resolve, reject) => {
    pool.query('SELECT department_id FROM department', (error, results) => {
        if (error) {
            reject(error);
        } else { 
            if(results.rows.length > 0) {
                resolve(results.rows[0].department_id);
            }            
        }
    });
    });  
};

// (END)

// GETS ALL ROLES AND ROLE IDS FOR DISPLAY (START)

function fetchRoles() {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM roles', (error, results) => {
        if (error) {
          reject(error);
        } else {
            if (results.rows.length > 0) {
          resolve(results.rows.map(({title, role_id}) => ({
            name: title,
            value: role_id
          })));
        }
        }
      });
    });
};

// (END)

// GETS A SINGLE ROLE ID FOR DISPLAY (START)

function fetchRoleId() {
    return new Promise((resolve, reject) => {
        pool.query('SELECT role_id FROM roles', (error, results) => {
            if (error) {
                reject(error);
            } else {
                if (results.rows.length > 0) {
                    resolve(results.rows[0].role_id);
                }
            }
        });
    });
};

// (END)

// GETS ALL EMPLOYEES AND EMPLOYEE IDS FOR DISPLAY (START)

function fetchEmployees() {
    return new Promise((resolve, reject) => {
        pool.query('SELECT first_name, last_name, employee_id FROM employee', (error, results) => {
          if (error) {
            reject(error);
          } else {
              if (results.rows.length > 0) {
            resolve(results.rows.map(({first_name, last_name, employee_id}) => ({
                name: `${first_name} ${last_name}`,
                value: employee_id
            })));
          }
          }
        });
      });
}

// (END)

// GETS A SINGLE EMPLOYEE ID FOR DISPLAY (START)

function fetchEmployeeId() {
    return new Promise((resolve, reject) => {
        pool.query('SELECT employee_id FROM employee', (error, results) => {
            if (error) {
                reject(error);
            } else {
                if (results.rows.length > 0) {
                    resolve(results.rows[0].employee_id);
                }
            }
        });
    });
};

// (END)

// GETS A SINGLE MANAGER ID FROM AN EMPLOYEE FOR DISPLAY (START)

function fetchManagerId() {
    return new Promise((resolve, reject) => {
        pool.query('SELECT manager_id FROM employee', (error, results) => {
            if (error) {
                reject(error);
            } else {
                if (results.rows.length > 0) {
                    resolve(results.rows[0].manager_id);
                }
            }
        });
    });
}

// (END)

// (GET DATA END)

// EXITS THE APP (EXIT START)

function quit() {
  console.log("Goodbye!");
  process.exit();
}



// (EXIT END)