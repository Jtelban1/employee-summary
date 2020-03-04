const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");


const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const managerQuestion = {
    name: 'officeNumber',
    message: "What's the manager's office number?"
};
const internQuestion = {
    name: 'school',
    message: "What's the intern's school?"
};
const engineerQuestion = {
    name: 'github',
    message: "What's the engineer's github account?"
};


const questions = [
    {
        name: 'name',
        message: 'What\'s the name of your employee'
    },
    {
        name: 'id',
        message: "The employee's id?",

    },
    {
        name: "email",
        message: "The employee's email is?"
    }
];
const addEmployee = [
    {
        name: 'add',
        message: 'Do you want to add another team member?',
        type: 'confirm'
    },
    {
        name: 'employeeType',
        message: 'What kind of employee do you want to add?',
        type: 'list',
        choices: ['Intern', 'Engineer'],
        when: function(responses){
            return responses.add;
        }
    }
];

let manager = questions;
manager.push(managerQuestion);
console.log(manager);