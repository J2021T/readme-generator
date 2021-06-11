// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
// function renderLicenseBadge(license) {}

// // TODO: Create a function that returns the license link
// // If there is no license, return an empty string
// function renderLicenseLink(license) {}

// // TODO: Create a function that returns the license section of README
// // If there is no license, return an empty string
// function renderLicenseSection(license) {}

// generate install steps
const generateInstallSteps = installStepsArr => {
  return `${installStepsArr.map(({ installStep, confirm}) => {
    return `*  ${installStep}`;
  }).join('\n  ')}`
};

// generate table of contents
const generateTableContents = sectionsArr => {
    return `${sectionsArr.map((section) => {
      return '* [' + section + '](#' + section.toLowerCase() + ')';
    }).join('\n  ')}`
};

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
  return `
  # ${data.title}

  ## Description
  ${data.description}

  ## Table of Contents
  ${generateTableContents(data.sections)}

  ## Installation
  ${generateInstallSteps(data.installSteps)}

  ## Usage
  ${data.usage}
`;
}

module.exports = generateMarkdown;
