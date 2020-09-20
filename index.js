//Require modules for the application
const inquirer = require('inquirer');
const { title } = require('process');
const util = require('util');

//Promisify writeFile function for later use
const writeReadmeAsync = util.promisify(fs.writeFile);

//Function collects all answers from the user about their README
function getAnswers() {
    return inquirer.prompt([
        {
            type: 'input',
            message: 'What is the title of your project?',
            name: 'title'
        },
        {
            type: 'input',
            message: 'Describe your project and its function.',
            name: 'description'
        },
        {
            type: 'input',
            message: 'How does the user install your application?',
            name: 'installation'
        },
        {
            type: 'input',
            message: 'Enter some examples and show the expected output from your application',
            name: 'usage'
        },
        {
            type: 'input',
            message: 'Deescribe to the user how they can contribute to your project.',
            name: 'contributing'
        },
        {
            type: 'input',
            message: 'How can the user test your application once installed?',
            name: 'tests'
        },
        {
            type: 'input',
            message: 'What is your full GitHub URL?',
            name: 'github'
        },
        {
            type: 'input',
            message: 'What email address can users reach you at?',
            name: 'email'
        },
        // {
        //     type: 'list',
        //     message: 'What license would you like to use for your project?',
        //     choices: [

        //     ]
        // }
    ]);
};