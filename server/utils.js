const fs = require('fs');
const path = require('path');

function createTree(dirPath) {
    const stats = fs.lstatSync(dirPath);
    if (!stats.isDirectory()) {
        return {
            name: path.basename(dirPath),
            path: dirPath,
            type: 'file',
        };
    }

    const tree = {
        name: path.basename(dirPath),
        path: dirPath,
        type: 'directory',
        children: [],
    };

    const fileNames = fs.readdirSync(dirPath);
    fileNames.forEach(fileName => {
        const childPath = path.join(dirPath, fileName);
        const childTree = createTree(childPath);
        if (childTree !== null) {
            tree.children.push(childTree);
        }
    });

    return tree;
}

module.exports = { createTree };