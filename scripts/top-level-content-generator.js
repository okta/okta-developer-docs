const fs = require('fs');
const chalk = require('chalk');

const docs = "./packages/@okta/vuepress-site/docs"; // Main document folder

// Flag to check
let isSiblingFolders = false;

(function dirTree(dir) {

  const folders = fs.readdirSync(dir); // Scanning a directory

  for (let folder of folders) {
    isSiblingFolders = true;
    if (fs.statSync(folder = dir + "/" + folder).isDirectory()) { // Checking if a directory is
      const file = folder + '/index.md'; // Path to file

      // Determinating if there are adjacent folders (is the folder expanded)
      const siblingFolders = fs.readdirSync(folder, { withFileTypes: true })
        .filter(d => d.isDirectory())
        .map(d => d.name);

      fs.stat(file, function (err) {
        if (err && siblingFolders.length > 0) { // Check if there are adjacent folders - create a file index.md

          // Creatind a file
          fs.open(file, 'w', (err) => {
            if (err) throw err;

            //  Create a title for index.md
            let folderName = folder.replace(/^.*[\\\/]/, ''); // Leave only the parent directory
            let folderNameCapitalized = folderName[0].toUpperCase() + folderName.slice(1).replace('-', ' '); // Making a capital letter

            let link;
            let linkTemplate;
            let linksArray = [];

            let title;
            let titleCapitalized;

            for (let i = 0; i < siblingFolders.length; i++) {

              // Creating titles for links
              title = siblingFolders[i].replace(/^.*[\\\/]/, ''); // Leave only the parent directory
              titleCapitalized = title[0].toUpperCase() + title.slice(1).replace('-', ' '); // Making a capital letter

              // Creating link paths
              link = folder.split('vuepress-site')[1] + "/" + siblingFolders[i]; // Link
              linkTemplate = "[" + titleCapitalized + "]" + "(" + link + ")" + "\n"; // Wrapping in markup

              // Add the created templates to the array
              linksArray.push(linkTemplate);
            }

            console.log(chalk.bold.blue('In folder: ' + chalk.bold.red(folder)));
            console.log(chalk.bold.blue('File: ' + chalk.bold.red(file) + ' not found!'));
            console.log(chalk.bold.green('File created! ✅'));
            console.log(chalk.bold.white('----------------------------------------'));

            fs.writeFile(file, // Create content for generated index.md file

              // Generated file template
              "---" + "\n" +
              "title: " + folderNameCapitalized + " Overview\n" +
              "---" + "\n" +
              "\n<br> \n\n" +
              linksArray.join("\n") // Display links for all internal pages
              ,
              (err) => {
                if (err) throw err;
                console.log(chalk.bold.green('Template: ' + chalk.bold.red(file) + ' generated! ✅'));
                console.log(chalk.bold.white('----------------------------------------'));
              });
          });
        }
        else if (siblingFolders.length == 0 && isSiblingFolders == true) {
          console.log(chalk.bold.green('There are no adjacent folders! 👀 Nothing to create! 🙌'));
          isSiblingFolders = false;
        }
        else {
          // console.log(chalk.bold.green('In folder: ' + folder));
          // console.log(chalk.bold.green('File: ' + file + ' founded ✅'));
          // console.log(chalk.bold.white('----------------------------------------'));
        }
      });
      dirTree(folder);
    }
  }
})(docs);