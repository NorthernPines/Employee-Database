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
    db.query('SELECT * FROM departments', function (err, data) {
        if (err) {
            throw err;
        }
        console.table(data);
        question();
    })
}

function viewRoles() {
    db.query('SELECT * FROM roles', function (err, data) {
        if (err) {
            throw err;
        }
        console.table(data);
        question();
    })
}

function viewEmployees() {
    db.query('SELECT * FROM employees', function (err, data) {
        if (err) {
            throw err;
        }
        console.table(data);
        question();
    })
}

function addDepartment() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the new department\'s name?',
                name: 'department'
            }
        ])
        .then((data) => {
            db.query(`INSERT INTO departments (department_name)
                    VALUES (?);`, [data.department], function (err, data) {
                if (err) {
                    throw err;
                }
                console.table('Successfully added department!');
                question();
            });
        })
}

async function addRole() {
    const depList = await db.promise().query('SELECT * FROM departments');;

    let shortenedDepList = [];
    for (i = 0; i < depList[0].length; i++) {
        if (!shortenedDepList.includes(depList[0][i].department_name)) {
            shortenedDepList.push(depList[0][i].department_name)
        }
    }
    console.log(shortenedDepList);
    const questions = [
{
    type: 'input',
    message: 'What is the new role\'s name?',
    name: 'role'
},
{
    type: 'input',
    message: 'What is the salary of that role?',
    name: 'salary'
},
{
    type: 'list',
    message: 'What department is that role in?',
    name: 'department',
    choices: shortenedDepList
}]
    inquirer
        .prompt(questions)
        .then((data) => {
            console.log('test');
            db.query(`INSERT INTO roles (title, salary)
                    VALUES (?);`, [data.role, data.salary], function (err, data) {
                if (err) {
                    throw err;
                }
                console.table('Successfully added role!');
                question();
            });
        })
}

function getDepList() {
    // async function f() {
    // const depList = db.query('SELECT * FROM departments', (err, data) => {
    //     if (err) {
    //         throw err;
    //     }
    //     let shortenedDepList = [];
    //     for (i = 0; i < data.length; i++) {
    //         if (!shortenedDepList.includes(data[i].department_name)) {
    //             shortenedDepList.push(data[i].department_name)
    //         }
    //     }
    //     console.log(shortenedDepList);
    //     return (shortenedDepList);
    // });
    // }
}

function addEmployee() {

}

function updateRole() {

}

// choices: [{name: 'HR', value: 1}]
// var test = getDepList();
// console.log(test);