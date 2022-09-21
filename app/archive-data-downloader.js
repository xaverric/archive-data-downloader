import { readConfiguration } from "./modules/configuration/configuration-reader-module.js";
import { getPodName } from "./modules/k8s/kubectl-pod-details-module.js";
import { CONSOLE_LOG } from "./modules/logger/logger.js";
import { downloadDataFromFolders, getAvailableFolders } from "./modules/service/download-service.js";


export const download = async (cmdArgs) => {
    let configuration = await readConfiguration(cmdArgs);
    let podName = await getPodName(configuration);
    configuration.folders = await getAvailableFolders(configuration, podName);
    CONSOLE_LOG.info(`Folders: [${configuration.folders.join(", ")}] - Search keys: [${configuration.filterKeys.join(", ")}]`);
    await downloadDataFromFolders(configuration, podName);
}

export const help = async (usage) => {
    CONSOLE_LOG.info(usage);
}