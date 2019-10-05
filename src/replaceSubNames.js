const path = require('path');
const fileutils = require('../lib/FileUtils');

const seasonDir = process.argv[2];

async function replaceSubsName() {
    const fileNames = await fileutils.dirFileNames(seasonDir);
    const filePath = fileName => seasonDir + path.sep + fileName;

    const subtitleFiles = fileNames.filter(fileutils.isASubsFile).map(filePath);
    const videoFiles = fileNames.filter(fileutils.isAVideoFile).map(filePath);
    // const desiredSubsNames = videoFiles.map(name => name.replace(/(\.mp4|\.mkv|\.avi|\.flv)$/, '.srt'))

    for (let s in subtitleFiles) {
        if (videoFiles.length) {
            const foundPattern = subtitleFiles[s].toLowerCase().match(/s[0-9]{2}e[0-9]{2}/);
            if (foundPattern) {
                for (let v in videoFiles) {
                    // if (!subtitleFiles.includes(desiredSubsNames[v])) {
                    if (videoFiles[v].toLowerCase().includes(foundPattern[0])) {
                        fileutils.renameSubs(subtitleFiles[s], videoFiles[v]);
                        videoFiles.splice(v, 1);
                        break;
                    }
                    // }
                }
            }
        } else {
            break;
        }
    }
}

module.exports = replaceSubsName;
