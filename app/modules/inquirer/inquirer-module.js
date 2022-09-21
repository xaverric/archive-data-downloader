import inquirer from "inquirer";
import settings from "./inquirer-module.settings.js";

export const promptMode = async () => {
    let answer = await inquirer.prompt([
        {
            type: 'list',
            message: 'Mode:',
            name: 'mode',
            choices: Object.keys(settings.questions.mode).map(key => {return {name: key}})
        }
    ]);
    return answer.mode;
};

export const promptFolders = async (mode) => {
    let answers = await inquirer.prompt(settings.questions.mode[mode]);
    return Object.values(answers);
};

export const promptFilter = async () => {
    let answer = await inquirer.prompt([
        {
            type: 'confirm',
            message: 'Filter data?',
            name: 'filter',
            choices: Object.keys(settings.questions.filter).map(key => {return {name: key}})
        }
    ]);
    return answer.filter;
}

export const promptFilterKeys = async (mode) => {
    let answers = await inquirer.prompt(settings.questions.filter[mode]);
    return Object.values(answers).flatMap(item => item.split(" "));
}