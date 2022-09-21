# archive-data-downloader
Extract data from any k8s container like a pro.

## Installation
```
npm install -g archive-data-downloader
```

## Usage
```
archive-data-downloader <command> <command parameters>
```

## Commands
```
help       Display this help.
download   Performs data download from the k8s container
```

## Parameters
### **--command** [string]
downloadd, help commands. All these can be used as default commands without providing --command argument

### -c, --config [string]
File path to the configuration object

**Configuration File Convention**
All configuration fields are mandatory.
```json
{
  "context": "...k8s context name...",
  "namespace": "...k8s namespace name...",
  "uuApp": "...uuApp name...",
  "basePath": "...base path for data download...",
  "output": "...base path for outputs on local file system..." // for windows \\\\.\\Users\\ is equivalent to C:\Users\
}
```

In case the configuration is not provided, the tool searches for the configuration file in a default location ```%HOME%/.archive-data-downloader/config.json```

### --mode
[single|range] mode. Range supported in case the folders under the base folder follow the YYYY-MM-DD format only.

### --folders
Folders to be downloaded. In case single mode is used, first value is used only. In case range value is used, first and second value is used to determine the date range.

### --filer
Flag definining whether the tool should filter file names by specific keys

### --filterKeys
In case filter is option is used, you can define the specific search keys.

## Interactive Input
Tool supports interactive provision of parameters. It is only mandatory to provide a configuration object to the tool. In case other parameters are missing the tool will ask for them interactively.

## Logs
logs are automatically stored to the ```%HOME%/.archive-data-downloader/logs``` folder