// TODO: Include packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');
// const { formatWithOptions } = require('util');
const generateMarkdown = require('./utils/generateMarkdown.js');
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
        name: 'github',
        message: 'Please enter your GitHub username for the questions section.'
    },

    {
        type: 'input',
        name: 'email',
        message: 'Please enter your email address for the questions section.'
    },

    {
        type: 'confirm',
        name: 'Deployed Application Screenshot',
        message: 'Would you like to add a deployed screenshot section?'
    },

    {
        type: 'checkbox',
        name: 'sections',
        message: 'Select the other sections you would like to add to your README.md file.',
        choices: ['Installation', 'Usage', 'Deployed Application Link', 'Deployed Application Screenshot', 'Credits', 'License', 'Badges', 'Features', 'Contributing', 'Tests']
    },

    {
        type: 'input',
        name: 'usage',
        message: 'Provide information on how to use the application. (Required)',
        when: ({ sections }) => {
            if (sections.includes('Usage')) {
                return true;
            } else {
                return false;
            }
        },
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
addInstallSteps = userResponse => {
    // create array of steps
    if (!userResponse.installSteps) {
        userResponse.installSteps = [];
    }

    console.log(`
        ============
        Add New Step
        ============
    `);
    // prompt steps question
    return inquirer.prompt(installStepQuestion)
    .then(installStepsData => {
        userResponse.installSteps.push(installStepsData);

        // run question again if another step was confirmed
        if (installStepsData.confirmNextStep) {
            return addInstallSteps(userResponse);
        } else {
            return userResponse;
        };
    });
};

// add credits question
const creditQuestion = [
    {
        type: 'input',
        name: 'collaborator',
        message: 'What is the name of the collaborator? (Required)',
        validate: collaboratorInput => {
            if (collaboratorInput) {
                return true;
            } else {
                console.log('Please provide collaborator name!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'githubLink',
        message: "What is the collaborator's github link?"
    },
    {
        type: 'confirm',
        name: 'confirmNextCredit',
        message: 'Would you like to add another credit?'
    }
];

// recursive credit question function
addCredit = userResponse => {
    // create array of credits
    if (!userResponse.credits) {
        userResponse.credits = [];
    };

    console.log(`
    ==============
    Add New Credit
    ==============
    `);

    return credit.prompt(creditQuestion)
        .then(creditData => {
            userResponse.credits.push(creditData);

            if (creditData.confirmNextCredit) {
                return addCredit(userResponse);
            } else {
                return userResponse;
            }
        });
};

// // TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(`./dist/${fileName}`, data, err => {
        if (err) throw err;
        console.log('README.md created!')
    });
};

// TODO: Create a function to initialize app
function init() {
    return inquirer.prompt(questions);
};

// Function call to initialize app
init()
.then(userResponse => {
    if (userResponse.sections.includes('Installation')) {
        return addInstallSteps(userResponse);
    } else {
        return userResponse;
    }
})
.then(userResponse => {
    if (userResponse.sections.includes('Credits')) {
        addCredit(userResponse);
        console.log(userResponse);
        return userResponse;
    } else {
        console.log(userResponse);
        return userResponse;
    }
}).then(userResponse => generateMarkdown(userResponse))
.then(generateReadme => writeToFile('README.MD', generateReadme))
.catch(err => {
    console.log(err);
});


