const fs = require('fs');

module.exports = (function () {
    const formats = {
        video: ['mp4', 'avi', 'mkv', 'flv'],
        subtitle: ['srt']
    };
    const videoFileRe = /(\.mp4|\.mkv|\.avi|\.flv)$/;

    const isFileTypeOf = (fileType) => (fileName => formats[fileType].some(format => fileName.endsWith(format)));

    const dirFiles = dirPath => new Promise((resolve, reject) => {
        fs.readdir(dirPath, {
            withFileTypes: true
        }, (err, files) => {
            if (err) {
                return reject(err);
            }
            return resolve(files.filter(dirent => dirent.isFile()).map(file => file.name));
        })
    });

    const renameFile = (extension) => (oldName, newName) => new Promise((resolve, reject) => {
        newName = newName.replace(videoFileRe, '.' + extension);
        if (oldName !== newName) {
            fs.rename(oldName, newName, (err) => {
                if (err) {
                    return reject(err);
                }
                return resolve();
            })
        }
    });

    return {
        isAVideoFile: isFileTypeOf('video'),
        isASubsFile: isFileTypeOf('subtitle'),
        renameSubs: renameFile('srt'),
        dirFileNames: dirFiles
    };
})();