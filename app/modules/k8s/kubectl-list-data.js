import { callCliCommand } from "../../cmd/cmd-exec-module.js";

export const listFolders = async (configuration, podName) => {
    let result = await callCliCommand(`kubectl exec -n ${configuration.namespace} ${podName} -- ls ${configuration.basePath}`);
    return result.split("\n");
};

export const listFiles = async (configuration, podName, day) => {
    let result = await callCliCommand(`kubectl exec -n ${configuration.namespace} ${podName} -- find ${configuration.basePath}/${day} -type f`);
    return result.split("\n");
}