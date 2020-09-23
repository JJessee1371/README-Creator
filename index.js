//Required modules for the application
const fs = require('fs');
const inquirer = require('inquirer');
const util = require('util');
const axios = require('axios');

//Promisify writeFile function for later use creating README file
const writeReadmeAsync = util.promisify(fs.writeFile);

async function getAnswers() {
    try {
        //Inquirer prompts are all answered and stored
        const answers = await inquirer.prompt([
            {
                type: 'input',
                message: 'What is the title of your project?',
                name: 'title'
            },
            {
                type: 'list',
                message: 'What license would you like to use for your project?',
                choices: [
                    'MIT',
                    'GNU Lesser General Public License v3.0',
                    'Mozilla Public License 2.0',
                    'GNU Affero General Public License v3.0',
                    'The Unlicense',
                    'Apache License 2.0',
                    'GNU General Public License v3.0'
                ],
                name: 'license'
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
            }
        ]);

        //License information is retreived via AXIOS
        const license = await getLicense(answers);

        //Readme is genereated and written to the file
        const text = await generateReadme(answers, license);
        await writeReadmeAsync('READMEtest.md', text);

    } catch(error) {
        console.log(error)
    };
};


function getLicense(answers) {
    let githubURL = '';
    switch(answers.license) {
        case 'MIT':
            githubURL = 'https://api.github.com/licenses/mit';
            break;

        case 'GNU Lesser General Public License v3.0':
            githubURL = 'https://api.github.com/licenses/lgpl-3.0';
            break;

        case 'Mozilla Public License 2.0':
            githubURL = 'https://api.github.com/licenses/mpl-2.0';
            break;

        case 'GNU Affero General Public License v3.0':
            githubURL = 'https://api.github.com/licenses/agpl-3.0';
            break;

        case 'The Unlicense':
            githubURL = 'https://api.github.com/licenses/unlicense';
            break;

        case 'Apache License 2.0':
            githubURL = 'https://api.github.com/licenses/apache-2.0';
            break;

        case 'GNU General Public License v3.0':
            githubURL = 'https://api.github.com/licenses/gpl-3.0';
    };

    return axios.get(githubURL);
};


//Returned data is compiled into a markdown format to be written
function generateReadme(answers, license) {
    //Based on chosen license a badge is selected for the README
    let badge ='';
    switch(answers.license) {
        case 'MIT':
            badge = '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)';
            break;

        case 'GNU Lesser General Public License v3.0':
            badge = '[![License: LGPL v3](https://img.shields.io/badge/License-LGPL%20v3-blue.svg)](http://www.gnu.org/licenses/lgpl-3.0)';
            break;

        case 'Mozilla Public License 2.0':
            badge = '[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)';
            break;

        case 'GNU Affero General Public License v3.0':
            badge = '[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)';
            break;

        case 'The Unlicense':
            badge = '[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)';
            break;

        case 'Apache License 2.0':
            badge = '[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)';
            break;

        case 'GNU General Public License v3.0':
            badge = '[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](http://www.gnu.org/licenses/gpl-3.0)';
            break;
            
    };

//Insert all data into the markdown format
return `
# ${answers.title}
${badge}

## Table of contents
* [License](#License)
* [Description](#Description)
* [Installation](#Installation)
* [Usage](#Usage)
* [Contributing](#Contributing)
* [Tests](#Tests)
* [Questions](#Questions)

### License
${license.data.body}
    
### Description
${answers.description}
    
### Installation
${answers.installation}
    
### Usage
${answers.usage}
    
### Contributing
${answers.contributing}
    
### Tests
${answers.tests}

### Questions
For more information you can reach the creator through github at the following:
[GitHub](${answers.github})
Or by email at this address:
Email: ${answers.email}`
};


//Execute the application
getAnswers()
.then(() => {
    console.log('Your README file was written successfully!')
})
.catch((error) => {
    console.log(error);
});