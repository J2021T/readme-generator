// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
const renderLicenseBadge = data => {
  if (data.sections.includes('License')) {
    return `![${data.license} License](https://img.shields.io/badge/license-${data.license}-blue)`;
  } else {
    return '';
  }
};


// // TODO: Create a function that returns the license section of README
// // If there is no license, return an empty string
const renderLicenseSection = data => {
  if (data.sections.includes('License')) {
    return `This project is covered under the [${data.license}](../assets/license-files/${data.license}.txt) license.\n
 ${renderLicenseBadge(data)}`;
  } else {
    return '';
  }
};

// generate install steps
const generateInstallSteps = data => {
  if (data.sections.includes('Installation')) {
    return `${data.installSteps.map(({ installStep, confirm}) => {
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
  if (data.sections.includes('Deployed-Application-Link')) {
    return `
  ${data.link}`;
  } else {
    return '';
  }
};

const generateDeployedScreenshot = data => {
  if (data.sections.includes('Deployed-Application-Screenshot')) {
    return `
  ![Alt-text](assets/images/*REMOVE AND ADD YOUR FILE NAME*.png "PLACE YOUR ALT TEXT HERE")`;
  } else {
    return '';
  }
};

const generateResultScreenshot = data => {
  if (data.sections.includes('Result-Screenshot')) {
    return `
  ![Alt-text](assets/images/*REMOVE AND ADD YOUR FILE NAME*.png "PLACE YOUR ALT TEXT HERE")`;
  } else {
    return '';
  }
};

const generateCredits = data => {
  if (data.sections.includes('Credits')) {
    return `
    ${data.credits.map(({ collaborator, githubLink, confirm }) => {
      return `
  * ${collaborator}
  * GitHub: [${githubLink}](https://github.com/${githubLink})`;
    }).join('\n  ')}`
  } else {
    return '';
  }
};

const generateQuestions = data => {
  if (data.sections.includes('Questions')) {
    return `GitHub: [${data.github}](https://github.com/${data.github})\n
  EMAIL: [${data.email}](mailto:${data.email})`;
  } else {
    return '';
  }
}

// const generateContributing = data => {
//   if (data.sections.includes('Contributing')) {
//     return `${data.contributing}`;
//   } else {
//     return '';
//   }
// };

// const generateTests = data => {
//   if (data.sections.includes('Tests')) {

//   }
// };

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
  let readMeSections = '';
  const sectionsArr = [
    {
      header: 'Installation',
      content: generateInstallSteps(data)
    },

    {
      header: 'Usage',
      content: data.usage
    },

    {
      header: 'Deployed-Application-Link',
      content: generateDeployedLink(data)
    },

    {
      header: 'Deployed-Application-Screenshot',
      content: generateDeployedScreenshot(data)
    },

    {
      header: 'Result-Screenshot',
      content: generateResultScreenshot(data)
    },

    {
      header: 'Credits',
      content: generateCredits(data)
    },

    {
      header: 'Contributing',
      content: data.contributing
    },

    {
      header: 'Tests',
      content: data.tests
    },

    {
      header: 'Questions',
      content: generateQuestions(data)
    },

    {
      header: 'License',
      content: renderLicenseSection(data)
    }
  ];

  // add sections if they user chose them
  sectionsArr.map((item) => {
    if (item.header && item.content) {
      readMeSections += `
  ## ${item.header}
  ${item.content}
  
  `;
    }
  }).join('\n  '); 
 
  return `
  # ${data.title}
  * ${renderLicenseBadge(data)}

  ## Description
  ${data.description}

  ## Table of Contents
  ${generateTableContents(data.sections)}

  ${readMeSections}
`;
}

module.exports = generateMarkdown;


  // ## Installation
  // ${generateInstallSteps(data.installSteps)}

  // ## Usage
  // ${data.usage}

  // ${generateDeployedLink(data)}

  // ${generateDeployedScreenshot(data)}

  // ${generateResultScreenshot(data)}

  // ${generateCredits(data)}
