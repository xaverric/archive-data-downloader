import { cmdArguments } from '../cli/arguments.js';
import { usage } from '../cli/usage.js'
import { help, download } from '../../archive-data-downloader.js';

export const COMMANDS = {
  COMMAND_HELP: 'help',
  COMMAND_DOWNLOAD: 'download'
};

export const actions = {
  help: {
    condition: () => handleCondition(cmdArguments.command === COMMANDS.COMMAND_HELP || cmdArguments.help || Object.keys(cmdArguments).length === 0),
    action: async () => await help(usage)
  },
  download: {
    condition: () => handleCondition(cmdArguments.command === COMMANDS.COMMAND_DOWNLOAD),
    action: async () => await download(cmdArguments)
  }
};

const handleCondition = (condition) => {
  if (_isKnownAction()) {
    return condition;
  }
};

const _isKnownAction = () => !cmdArguments._unknown;
