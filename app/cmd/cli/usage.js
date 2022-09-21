import commandLineUsage from 'command-line-usage';
import { cmdArgumentsDefinition } from './arguments.js';

const usageDefinition = [
  {
    header: 'archive-data-downloader',
    content: 'Extract data from any k8s container like a pro.'
  },
  {
    header: 'Synopsis',
    content: '$archive-data-downloader <command> <command parameters>'
  },
  {
    header: 'Commands',
    content: [
      { name: 'help', summary: 'Display this help.' },
      { name: 'download', summary: 'Performs data download from the k8s container' }
    ]
  },
  {
    header: 'Parameters',
    optionList: cmdArgumentsDefinition
  }
];

export const usage = commandLineUsage(usageDefinition);
