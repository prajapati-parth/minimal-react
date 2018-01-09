#!/usr/bin/env node

const commander = require('commander');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const fsExtra = require('fs-extra');
const { exec } = require('child_process');
const validateProjectName = require('validate-npm-package-name');

const packageJson = require('../package.json');

let projectName;
const githubRepoUrl = 'https://github.com/prajapati-parth/minimal-react-boilerplate.git';
const branchName = 'package-dev';

const program = new commander.Command(packageJson.name)
  .version(packageJson.version)
  .arguments('<project-directory>')
  .usage(`${chalk.green('<project-directory>')} [options]`)
  .action(name => {
    projectName = name;
  })
  .on('--help', () => {
    console.log(`Only ${chalk.green('<project-directory>')} is required as argument.`);
    console.log();
    console.log('If you have any probles, please file an issue')
    console.log();
  })
  .parse(process.argv);

// if project name is not specified
if (typeof projectName === 'undefined') {
  console.log();
  console.log('Please specify project directory:');
  console.log(`     ${chalk.blue(program.name())} ${chalk.green('<project-directory>')}`);
  console.log();
  console.log('For example:');
  console.log(`     ${chalk.blue(program.name())} ${chalk.green('my-first-react-app')}`);
  console.log();
  console.log(`Run ${chalk.blue(`${program.name()} --help`)} to see all options`);
  process.exit(1);
}

// check if directory with specified projectName exists
if(checkIfDirExists(projectName)) {
  console.log();
  console.log(`${chalk.red('ERROR:')} Directory '${projectName}' already exists.`);
  console.log('Please try again with some other name.');
  process.exit(1);
}

// check for valid npm naming conventions
checkForValidName(projectName);

createBoilerplate(projectName);

function createBoilerplate(name) {
  const rootDir = path.resolve(name);
  const appName = path.basename(rootDir);

  console.log();
  console.log(chalk.green('Fetching minimal-react-boilerplate...'));
  clone(githubRepoUrl).then(result => {
    if (result) {
      console.log(chalk.white.bgGreen('OK'));    
      modifyClone(appName);
      installDep().then(result => {
        if (result) {
          console.log(chalk.white.bgGreen('OK'));
          logFinalMessage(appName);
        }
      })
    }
  });
}

function clone(repoUrl) {
  return new Promise((resolve, reject) => {
    exec(`git clone -b ${branchName} ${repoUrl}`, (error, stdout, stderr) => {
      if (error) {
        console.log();
        console.log(chalk.white.bgRed('ERR'));
        console.log(chalk.red('Error while fetching minimal-react-boilerplate'));
        reject(error)
      } else {
        resolve(true)
      }
    })
  })
}

function modifyClone(appName) {
  const originalDirectory = process.cwd();
  
  // rename directory
  fs.renameSync(
    path.join(originalDirectory, 'minimal-react-boilerplate'),
    path.join(originalDirectory, appName)
  );

  console.log();
  console.log(chalk.green(`Setting up ${appName}...`));

  // change current directory to appName
  process.chdir(appName);

  // remove '.git' directory
  fsExtra.removeSync('./.git');
  //remove 'package-lock.json'
  fsExtra.removeSync('./package-lock.json');

  // update package.json
  let newPackageJson = JSON.parse(fs.readFileSync('./package.json', {encoding: 'utf8'}));
  newPackageJson.name = appName;
  newPackageJson.description = '';
  newPackageJson.author = '';

  fs.writeFileSync('./package.json', JSON.stringify(newPackageJson, null, 2));

  // update README.md
  const newReadmeData = `# ${appName}`
  fs.writeFileSync('./README.md', newReadmeData);

  console.log(chalk.white.bgGreen('OK'));
  console.log();
}

function installDep() {
  console.log(chalk.green('Installing dependencies...'))
  return new Promise((resolve, reject) => {
    exec(`npm i`, (error, stdout, stderr) => {
      if (error) {
        console.log();
        console.log(chalk.white.bgRed('ERR'));
        console.log(chalk.red(error));
        reject(error)
      } else {
        resolve(true)
      }
    })
  })
}

function logFinalMessage(appName) {
  console.log();
  console.log(chalk.green(`Success! Created ${appName} at ${process.cwd()}`));
  console.log('Inside the directory you can run several commands:');
  console.log();
  console.log(`  ${chalk.cyan('npm run dev')}`);
  console.log('    Starts the development server');
  console.log();
  console.log(`  ${chalk.cyan('npm run build')}`);
  console.log('    Creates the final javascript bundle in ./output');
  console.log();
  console.log('We suggest that you begin by typing:');
  console.log();
  console.log(`  ${chalk.cyan('cd')} ${appName}`);
  console.log(`  ${chalk.cyan('npm run dev')}`);
}

function checkIfDirExists(dirName) {
  const projectPath = path.resolve(dirName);
  return fs.existsSync(projectPath);
}

function checkForValidName(name) {
  const validationResult = validateProjectName(name);

  if (!validationResult.validForNewPackages) {
    console.log();
    console.log(`Could not create a project with name ${chalk.red(name)} due to npm naming conventions.`);
    printValidationResults(validationResult.errors);
    printValidationResults(validationResult.warnings);
    process.exit(1);
  }
}

function printValidationResults(errors) {
  if (typeof errors !== 'undefined') {
    errors.forEach(error => {
      console.log(`  *  ${error}`);
    })
  }
}