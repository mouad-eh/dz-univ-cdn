const express = require('express');
const path = require('path');
const cors = require('cors');
const { createTree } = require('./utils');

const app = express();

app.use(cors())

app.get('/api/tree', (req, res) => {
    const rootDir = path.resolve(__dirname, '../')
    const dirPath = path.join(rootDir, 'content');
    const tree = createTree(dirPath);
    res.json(tree);
});

app.get('/api/*', async (req, res) => {
    const relativePath = req.params[0]
    const rootDir = path.resolve(__dirname, '../')
    const absolutePath = path.join(rootDir, relativePath)
    res.sendFile(absolutePath)
    return;
})

app.get('/api/stream/*', async (req, res) => {
    const fileName = req.params[0]
    const streamDir = path.resolve(__dirname, '../stream')
    const absolutePath = path.join(streamDir, fileName)
    res.sendFile(absolutePath)
    return;
})

const port = 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}.`);
});