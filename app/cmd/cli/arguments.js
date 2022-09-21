import commandLineArgs from 'command-line-args';

export const cmdArgumentsDefinition = [
  {
    name: 'command',
    defaultOption: true,
    type: String,
    description: 'download, help commands. All these can be used as default commands without providing --command argument.'
  },
  {
    name: 'config',
    alias: 'c',
    type: String,
    description: 'File path to the configuration object'
  },
  {
    name: 'mode',
    type: String,
    description: '[single|range] mode. Range supported in case the folders under the base folder follow the YYYY-MM-DD format only.'
  },
  {
    name: 'folders',
    multiple: true,
    type: String,
    description: 'Folders to be downloaded. In case single mode is used, first value is used only. In case range value is used, first and second value is used to determine the date range.'
  },
  {
    name: 'filter',
    type: Boolean,
    description: 'Flag definining whether the tool should filter file names by specific keys.'
  },
  {
    name: 'filterKeys',
    multiple: true,
    type: String,
    description: 'In case filter is option is used, you can define the specific search keys.'
  }
];

export const cmdArguments = commandLineArgs(cmdArgumentsDefinition, { stopAtFirstUnknown: true });
