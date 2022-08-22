const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'rootbeer',
        database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
);
db.connect(function (err) {
    if (err) {
        throw err;
    }
    question();
})
function question() {

    inquirer
        .prompt([
            {
                type: 'list',
                message: "What would you like to do",
                name: 'selection',
                choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update employee role']
            }
        ])
        .then((data) => {
            const choice = data.selection;
            switch (choice) {
                case 'View all departments':
                    viewDepartments();
                    break;
                case 'View all roles':
                    viewRoles();
                    break;
                case 'View all employees':
                    viewEmployees();
                    break;
                case 'Add a department':
                    addDepartment();
                    break;
                case 'Add a role':
                    addRole();
                    break;
                case 'Add an employee':
                    addEmployee();
                    break;
                case 'Update employee role':
                    updateRole();
                    break;
            }
        })
}


function viewDepartments() {
    db.query('SELECT * FROM departments', function(err, data) {
        if (err) {
            throw err;
        } 
        console.table(data);
        question();
    })
}

function viewRoles() {
    db.query('SELECT * FROM roles', function(err, data) {
        if (err) {
            throw err;
        } 
        console.table(data);
        question();
    })
}

function viewEmployees() {
    db.query('SELECT * FROM employees', function(err, data) {
        if (err) {
            throw err;
        } 
        console.table(data);
        question();
    })
}

