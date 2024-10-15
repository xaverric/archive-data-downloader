import {callCliCommand} from "../../cmd/cmd-exec-module.js";

export const getPodName = async configuration => {
    let podsMetadata = await getPodsMetadata(configuration);
    return podsMetadata.find(item => {
        return item?.metadata?.annotations?.APP_PACK_URL_PATH === configuration.uuApp || item?.metadata?.labels?.["app.kubernetes.io/name"] === configuration.uuApp
    })?.metadata?.name;
}

export const getPodsMetadata = async configuration => {
    await callCliCommand(`kubectl config use-context ${configuration.context}`);
    let podDetails = await callCliCommand(`kubectl get pods -n ${configuration.namespace} -o jsonpath='{.items[*]}'`);
    return getArrayFromLineContent(podDetails).map(getPodDetail);
};

export const getPods = async configuration => {
    await callCliCommand(`kubectl config use-context ${configuration.context}`);
    return await callCliCommand(`kubectl get pods -n ${configuration.namespace} --sort-by=.metadata.creationTimestamp`);
};

const getArrayFromLineContent = (lines) => {
    let result = lines.toString().replace(/} {/g, "}||||{");
    if (process.platform === "win32") {
        result = result
            .slice(1)
            .slice(0, -1)
    }
    return result.length ? result.split("||||") : [];
};

const getPodDetail = line => {
    let result = "";
    try {
        result = JSON.parse(line); 
    } catch (e) {
        // ignore error and return empty line for given pod
    }
    return result;
};
