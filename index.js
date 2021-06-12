// TODO: Include packages needed for this project
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
        type: 'checkbox',
        name: 'sections',
        message: 'Select the other sections you would like to add to your README.md file.',
        choices: ['Installation', 'Usage', 'Deployed Application Link', 'Deployed Application Screenshot', 'Result Screenshot', 'Credits', 'Contributing', 'Tests', 'Questions', 'License']
    },

    {
        type: 'input',
        name: 'usage',
        message: 'Provide information on how to use the project. (Required)',
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
                console.log('Please provide information for using your project!');
                return false;
            }
        }
    },

    {
        type: 'input',
        name: 'link',
        message: 'Please provide the link to your deployed project.',
        when: ({ sections }) => {
            if (sections.includes('Deployed Application Link')) {
                return true;
            } else {
                return false;
            }
        },
        validate: linkInput => {
            if (linkInput) {
                return true;
            } else {
                console.log('Please provide a link for your project!');
                return false;
            }
        }
    },

    {
        type: 'input',
        name: 'contributing',
        message: 'Please describe how others can contribute to the project.',
        when: ({ sections }) => {
            if (sections.includes('Contributing')) {
                return true;
            } else {
                return false;
            }
        },
        validate: contributingInput => {
            if (contributingInput) {
                return true;
            } else {
                console.log('Please provide information for how to contribute to your project!');
                return false;
            }
        } 
    },

    {
        type: 'input',
        name: 'tests',
        message: 'Please describe how to test the project.',
        when: ({ sections }) => {
            if (sections.includes('Tests')) {
                return true;
            } else {
                return false;
            }
        },
        validate: testsInput => {
            if (testsInput) {
                return true;
            } else {
                console.log('Please provide information for how to test your project!');
                return false;
            }
        } 
    },

    {
        type: 'list',
        name: 'license',
        message: 'Please pick the license for your project.',
        choices: ['MIT', 'Apache', 'GPLv2', 'GPLv3'],
        when: ({ sections }) => {
            if (sections.includes('Tests')) {
                return true;
            } else {
                return false;
            }
        },
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
                console.log('Please provide information for installing your project!');
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
        message: "What is the collaborator's github link?",
        validate: githubLinkInput => {
            if (githubLinkInput) {
                return true;
            } else {
                console.log('Please provide collaborator name!');
                return false;
            }
        }
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

    return inquirer.prompt(creditQuestion)
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
        console.log(userResponse);
        return addCredit(userResponse);
    } else {
        
        return userResponse;
    }
})
.then(userResponse => generateMarkdown(userResponse))
.then(generateReadme => writeToFile('README.MD', generateReadme))
.catch(err => {
    console.log(err);
});


