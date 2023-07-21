import inquirer from "inquirer";
import {copy} from "../k8s/kubectl-copy-data.js";
import {listFiles, listFolders} from "../k8s/kubectl-list-data.js";
import {LOG} from "../logger/logger.js";

export const getAvailableFolders = async (configuration, podName) => {
    // list folders from k8s pod under the basePath
    let availableFolders = await listFolders(configuration, podName);
    // filter-out non-existing folders from the configuration
    return configuration.folders.filter(folder => availableFolders.includes(folder));
}

export const getAvailableFiles = async (configuration, podName, folder) => {
    let availableFiles = await listFiles(configuration, podName, folder);
    // filter available files if search keys defined
    if (configuration.filter) {
        availableFiles = availableFiles.filter(fileName => configuration.filterKeys.some(filterKey => fileName.includes(filterKey)));
        if (configuration.globalFilter) {
            availableFiles = availableFiles.filter(fileName => fileName.includes(configuration.globalFilter));
        }
    }
    // filter-out invalid filenames (empty)
    return availableFiles.filter(fileName => fileName);
}

export const downloadDataFromFolders = async (configuration, podName) => {
    const cmdBottomBar = new inquirer.ui.BottomBar();
    for (const [folderIndex, folder] of configuration.folders.entries()) {
        let availableFiles = await getAvailableFiles(configuration, podName, folder);
        await downloadFiles(configuration, podName, folder, folderIndex, availableFiles, cmdBottomBar);
    }
    cmdBottomBar.updateBottomBar(`Download exported into ${configuration.output}`);
    LOG.info(`Download exported into ${configuration.output}`);
    cmdBottomBar.close()
}

const downloadFiles = async (configuration, podName, folder, folderIndex, files, cmdBottomBar) => {
    for (const [fileIndex, file] of files.entries()) {
        cmdBottomBar.log.write(`Downloading file ${file}`);
        LOG.info(`Downloading file ${file}`);

        await copy(configuration, podName, file, `${file.replace(configuration.basePath, configuration.output)}`);

        cmdBottomBar.updateBottomBar(`Current folder: ${folder} (${folderIndex + 1} of ${configuration.folders.length})\nProcessed files: ${fileIndex + 1} of ${files.length}`);
    }
}