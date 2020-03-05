const Manager = require("./lib/Manager");
const fs = require("fs");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");


const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const questions = {
    general: [
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
    ],
    Manager: {
        name: 'officeNumber',
        message: "What's the manager's office number?"
    },
    Intern: {
        name: 'school',
        message: "What's the intern's school?"
    },
    Engineer: {
        name: 'github',
        message: "What's the engineer's github account?"
    },
    add: [
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
            when: function (responses) {
                return responses.add;
            }
        }
    ]
};
function generateQuestions(employeeType){
    let nextQuestions = [...questions.general];
    nextQuestions.push(questions[employeeType]);
    nextQuestions = nextQuestions.concat(questions.add);
    return nextQuestions;
}




let manager = generateQuestions('Manager');


console.log("Please create your Manager");
gatherEmployeeInfo(manager, 'Manager');


function gatherEmployeeInfo(currentQuestions, employeeType) {
    let nextQuestions;
    let nextEmployee;

    inquirer.prompt(currentQuestions).then(answers => {
        if ( answers.add  ) {
            nextEmployee = answers.employeeType;
            nextQuestions = generateQuestions(nextEmployee);

            addToEmployeeArray(answers, employeeType);

            console.log('Please create your '+nextEmployee);
            gatherEmployeeInfo(nextQuestions, nextEmployee);
        } else {
            addToEmployeeArray(answers, employeeType);
            // render now
            prepareEmployees();
        }

    })
}

let employees = [];
function addToEmployeeArray(answers, employeeType){
    answers.employeeType = employeeType;
    delete answers.add;

    switch (employeeType) {
        case "Manager": employees.push(new Manager(answers.name, answers.id, answers.email, answers.officeNumber)); break;
        case "Intern": employees.push(new Intern(answers.name, answers.id, answers.email, answers.school)); break;
        case "Engineer": employees.push(new Engineer(answers.name, answers.id, answers.email, answers.github)); break;
    }
}
function prepareEmployees(){
    let html = render(employees);
    fs.writeFileSync(outputPath, html);
    console.log('HTML generated');
    process.exit();

}