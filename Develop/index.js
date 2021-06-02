// TODO: Include packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');
// const generateMarkdown = require('./utils/generateMarkdown.js');

// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'What is the project title? (Required)',
        validate: titleInput => {
            if (titleInput) {
                return true;
            } else {
                console.log('Please provide a project title!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'description',
        message: 'Please give a description of your project; the what, why, and how. (Required)',
        validate: descriptionInput => {
            if (descriptionInput) {
                return true;
            } else {
                console.log('Please provide a project description!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Provide information on how to use the application. (Required)',
        validate: usageInput => {
            if (usageInput) {
                return true;
            } else {
                console.log('Please provide information for using your application!');
                return false;
            }
        }
    },
    {
        type: 'checkbox',
        name: 'sections',
        message: 'Select the other sections you would like to add to your README.md file.',
        choices: ['Installation', 'Deployed Application Link', 'Deployed Application Screenshot', 'Credits', 'License', 'Badges', 'Features', 'Contributing', 'Tests']
    },
    {
        type: 'input',
        name: 'link',
        message: 'Please provide the link to your deployed application.',
        when: ({ sections }) => {
            if (sections.includes('Deployed Application Link')) {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'confirm',
        name: 'Deployed Application Screenshot',
        message: 'Would you like to add a'
    }

];

//installation question
const installStepQuestion = [
    {
        type: 'input',
        name: 'installStep',
        message: "Please provide this install step's instructions. (Required)",
        validate: installStepInput => {
            if (installStepInput) {
                return true;
            } else {
                console.log('Please provide information for installing your application!');
                return false;
            }
        }
    },
    {
        type: 'confirm',
        name: 'confirmNextStep',
        message: 'Would you like to add another step?',
        default: false
    }
];

// recursive install steps function
addInstallSteps = readmeData => {
    // create array of steps
    if (!readmeData.installSteps) {
        readmeData.installSteps = [];
    }

    console.log(`
        ============
        Add New Step
        ============
    `);
    // prompt steps question
    return inquirer.prompt(installStepQuestion)
    .then(installStepsData => {
        readmeData.installSteps.push(installStepsData);

        // run question again if another step was confirmed
        if (installStepsData.confirmNextStep) {
            return addInstallSteps(readmeData);
        } else {
            return readmeData;
        };
    });
};

// // TODO: Create a function to write README file
// function writeToFile(fileName, data) {}

// TODO: Create a function to initialize app
function init() {
    return inquirer.prompt(questions);
}

// Function call to initialize app
init()
.then(userResponse => {
    if (userResponse.sections.includes('Installation')) {
        return addInstallSteps(userResponse);
    } else {
        return userResponse;
    }
})
