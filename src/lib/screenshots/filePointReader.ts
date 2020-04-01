const FILE_PATH_SEPARATOR = "\\";
const FILE_PATH_ANCHOR = `${FILE_PATH_SEPARATOR}screenshots${FILE_PATH_SEPARATOR}`;

export default (screenshot: {path: string, fileName: string}) => {


    return {
        // @ts-ignore
        filePath : screenshot.path.split(FILE_PATH_ANCHOR).pop().split(FILE_PATH_SEPARATOR).join(require('path').sep)
    };
};