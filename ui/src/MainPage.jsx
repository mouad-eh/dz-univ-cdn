import React, { useEffect, useState } from 'react';
import './MainPage.css';
import Header from './Header';
import TreeView from './TreeView';
import FileViewer from 'react-file-viewer';
import ReactHlsPlayer from 'react-hls-player';

function getFileExt(filename) {
    const arr = filename.split('.')
    return arr[arr.length - 1].toLowerCase()
}

function getFileName(filename) {
    const arr = filename.split('.')
    return arr[0].toLowerCase()
}

function replaceBackslashes(str) {
    return str.replace(/\\/g, '/');
}


function getEndPointFromPath(filePath) {
    const startIndex = filePath.indexOf('/content');
    if (startIndex === -1) {
        return '';
    }
    return 'http://localhost/api' + replaceBackslashes(filePath.slice(startIndex));
}

function getEndPointForVideo(filename) {
    return 'http://localhost/api/stream/' + getFileName(filename) + '.m3u8';
}

export default function MainPage() {
    const [selectedNode, setSelectedNode] = useState(null);
    useEffect(() => {
        console.log(selectedNode)
    }, [selectedNode])
    return (
        <div className="app-container">
            <Header />
            <div className="main-container">
                <div className="sidebar">
                    <TreeView setSelectedNode={setSelectedNode} />
                </div>
                <div className="file-preview">
                    {selectedNode && (
                        getFileExt(selectedNode.name) === "mp4" ?
                            <ReactHlsPlayer
                                src={getEndPointForVideo(selectedNode.name)}
                                autoPlay={false}
                                controls={true}
                            // width="60%"
                            // height="auto"
                            ></ReactHlsPlayer>
                            :
                            <FileViewer
                                fileType={getFileExt(selectedNode.name)}
                                filePath={getEndPointFromPath(selectedNode.path)}
                                errorComponent={<div>there is an error</div>}
                                onError={(e) => console.log(e)}
                            />)
                    }
                </div>
            </div>
        </div>
    )
}
