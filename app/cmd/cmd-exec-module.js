import util from 'util';
import child_process from 'child_process';

const exec = util.promisify(child_process.exec);

export const callCliCommand = async (command) => {
    //console.log(command);
    const {stdout} = await exec(command);
    return stdout; 
};

