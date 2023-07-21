import fs from "fs";
import path from "path";
import os from "os";

import { promptMode, promptFolders, promptFilter, promptFilterKeys } from "./../inquirer/inquirer-module.js";
import { postProcessDataRange } from "./configuration-date-range-helper.js";


const CONFIG_DEFAULT_PATH = path.join(os.homedir(), '.archive-data-downloader', 'config.json');
/**
 * Read JSON file from given file path location and parse its content to the object
 *  
 * @param {string} filePath 
 * @returns 
 */
const readJsonFile = filePath => {
    let data;
    try {
        data = JSON.parse(fs.readFileSync(filePath));
    } catch (err) {
        throw new Error(`Error occurred during loading file ${filePath}. Err: ${err}`);
    }
    return data;
};

export const readConfiguration = async cmdArgs => {
    let configuration;

    if (cmdArgs.config) {
        configuration = readJsonFile(path.resolve(cmdArgs.config))
    } else {
        configuration = readJsonFile(CONFIG_DEFAULT_PATH);
    }

    // prompt user for required parameters if not provided in command line
    configuration.mode = cmdArgs.noprompt ? cmdArgs.mode : cmdArgs.mode ||  await promptMode();
    configuration.folders = cmdArgs.noprompt ? cmdArgs.folders : cmdArgs.folders || await promptFolders(configuration.mode);
    configuration.filter = cmdArgs.noprompt ? cmdArgs.filter : cmdArgs.filter || await promptFilter();
    configuration.filterKeys = !configuration.filter ? [] : cmdArgs.noprompt ? cmdArgs.filterKeys : cmdArgs.filterKeys || await promptFilterKeys(configuration.filter);
    configuration.globalFilter = cmdArgs.globalFilter;

    // override basePath and output from command line if available
    configuration.basePath = cmdArgs.basePath || configuration.basePath;
    configuration.output = cmdArgs.output || configuration.output;

    if (configuration.mode === "range") {
        configuration.folders = postProcessDataRange(configuration.folders[0], configuration.folders[1]);
    }
    return configuration;
};


