import React, { useState } from 'react';
import './MainPage.css';
import Header from './Header';
import TreeView from './TreeView';
import FileViewer from 'react-file-viewer';

function getFileExt(filename) {
    const arr = filename.split('.')
    return arr[arr.length - 1].toLowerCase()
}

function replaceBackslashes(str) {
    return str.replace(/\\/g, '/');
}


function getEndPointFromPath(filePath) {
    const startIndex = filePath.indexOf('\\content');
    if (startIndex === -1) {
        return '';
    }
    return 'http://localhost:3000' + replaceBackslashes(filePath.slice(startIndex));
}

export default function MainPage() {
    const [selectedNode, setSelectedNode] = useState(null);
    return (
        <div className="app-container">
            <Header />
            <div className="main-container">
                <div className="sidebar">
                    <TreeView setSelectedNode={setSelectedNode} />
                </div>
                <div className="file-preview">
                    {selectedNode && <FileViewer
                        fileType={getFileExt(selectedNode.name)}
                        filePath={getEndPointFromPath(selectedNode.path)}
                        errorComponent={<div>there is an error</div>}
                        onError={(e) => console.log(e)}
                    />}
                </div>
            </div>
        </div>
    )
}
