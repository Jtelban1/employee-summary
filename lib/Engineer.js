// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");

 module.exports = class Engineer extends Employee {
    contructor(name, id, email, github){
    Super(name,id, email);
    this.github = github;
    }
}
