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
  if (data.sections.includes('Installation')) {
    return `${installStepsArr.map(({ installStep, confirm}) => {
      return `*  ${installStep}`;
    }).join('\n  ')}`
  } else {
    return '';
  }
};

// generate table of contents
const generateTableContents = sectionsArr => {
    return `${sectionsArr.map((section) => {
      return '* [' + section + '](#' + section.toLowerCase() + ')';
    }).join('\n  ')}`
};

const generateDeployedLink = data => {
  if (data.sections.includes('Deployed Application Link')) {
    return `
  ${data.link}`;
  } else {
    return '';
  }
}

const generateDeployedScreenshot = data => {
  if (data.sections.includes('Deployed Application Screenshot')) {
    return `
  ## Deployed Application Screenshot
  ![Alt-text](assets/images/*REMOVE AND ADD YOUR FILE NAME*.png "PLACE YOUR ALT TEXT HERE")`;
  } else {
    return '';
  }
}

const generateResultScreenshot = data => {
  if (data.sections.includes('Result Screenshot')) {
    return `
  ## Result Screenshot
  ![Alt-text](assets/images/*REMOVE AND ADD YOUR FILE NAME*.png "PLACE YOUR ALT TEXT HERE")`;
  } else {
    return '';
  }
}

const generateCredits = data => {
  if (data.sections.includes('Credits')) {
    return `
  ## Credits
    ${data.credits.map(({ collaborator, githubLink, confirm }) => {
      return `
  * ${collaborator}
  * ${githubLink}`;
    }).join('\n  \n  ')}`
  } else {
    return '';
  }
}

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
  const sectionsArr = [
    {
      header: 'Installation',
      content: generateInstallSteps(data.installSteps)
    },

    {
      header: 'Usage',
      content: data.usage
    },

    {
      header: 'Deployed Application Link',
      content: generateDeployedLink(data)
    },

    // {
    //   header:
    //   content:
    // }
  ]
  let readMeSections = '';
  return `
  # ${data.title}
  * ${renderLicenseBadge(license)}

  ## Description
  ${data.description}

  ## Table of Contents
  ${generateTableContents(data.sections)}

  ## Installation
  ${generateInstallSteps(data.installSteps)}

  ## Usage
  ${data.usage}

  ${generateDeployedLink(data)}

  ${generateDeployedScreenshot(data)}

  ${generateResultScreenshot(data)}

  ${generateCredits(data)}
`;
}

module.exports = generateMarkdown;
