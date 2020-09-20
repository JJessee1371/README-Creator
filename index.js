//Require modules for the application
const fs = require('fs');
const inquirer = require('inquirer');
const util = require('util');

//Promisify writeFile function for later use
const writeReadmeAsync = util.promisify(fs.writeFile);

//Function collects all answers from the user about their README via inquirer
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


//generateReadme will take in the user data and format it to be written
function generateReadme(answers) {
    return `#${answers.title}

    ##Table of contents
    [Description](#Description)
    [Installation](#Installation)
    [Usage](#Usage)
    [Contributing](#Contributing)
    [Tests](#Tests)
    [Questions](#Questions)
    
    ###Description
    ${answers.description}
    
    ###Installation
    ${answers.installation}
    
    ###Usage
    ${answers.usage}
    
    ###Contributing
    ${answers.contributing}
    
    ###Tests
    ${answers.tests}
    
    ###Questions
    For more information you can reach the creator at:
    GitHub: <a href="${answers.github}"></a>
    Email: ${answers.email}`
};


getAnswers()
.then((answers) => {
    //Once answers are collected they are passed to the generateReadme function
    const readmeText = generateReadme(answers);
    //Promisifed function writes the users input to the README file
    return writeReadmeAsync('readmetest.md', readmeText);
})
.then(() => {
    //If successful the user is notified
    console.log('README successfully written!');
})
.catch((err) => {
    //If an error occurs the user is notified 
    console.log(err);
});