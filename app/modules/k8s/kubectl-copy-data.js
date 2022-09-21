import { callCliCommand } from "../../cmd/cmd-exec-module.js";

export const copy = async (configuration, podName, source, output) => {
    await callCliCommand(`kubectl cp ${configuration.namespace}/${podName}:${source} ${output} --retries=-1`);
};