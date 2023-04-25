import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdFolder, MdFolderOpen, MdInsertDriveFile } from 'react-icons/md';
import './TreeView.css';

function TreeView({ setSelectedNode }) {
    const [treeData, setTreeData] = useState([]);

    useEffect(() => {
        function addToggledProperty(node) {
            if (node.type === 'directory') {
                node.toggled = true;
                if (node.children) {
                    node.children.forEach(childNode => addToggledProperty(childNode));
                }
            }
        }
        const fetchData = async () => {
            const result = await axios('http://localhost/api/tree');
            console.log(result.data);
            addToggledProperty(result.data);
            setTreeData([result.data]);
        };
        fetchData();
    }, []);

    const renderNode = (node, level) => {
        const isDirectory = node.type === 'directory';
        const arrowIcon = isDirectory ? (node.toggled ? <MdFolderOpen /> : <MdFolder />) : null;
        const fileIcon = isDirectory ? null : <MdInsertDriveFile />;
        const marginLeft = level * 10;
        return (
            <div className="tree-node" key={node.path}>
                <div className="node-content" style={{ marginLeft }}>
                    {arrowIcon && <div className="node-arrow" onClick={() => isDirectory && toggleNode(node)}>{arrowIcon}</div>}
                    {fileIcon && <div className="node-file">{fileIcon}</div>}
                    <span className="node-name"
                        onClick={
                            () => {
                                isDirectory && toggleNode(node);
                                !isDirectory && setSelectedNode(node);
                            }
                        }>
                        {node.name}
                    </span>
                </div>
                {isDirectory && node.toggled && (
                    <div className="node-children">
                        {node.children.map((child) => renderNode(child, level + 1))}
                    </div>
                )}
            </div>
        );
    };

    const toggleNode = (node) => {
        node.toggled = !node.toggled;
        setTreeData([...treeData]);
    };

    return (
        <div className="tree-view">
            {treeData.map((node) => renderNode(node, 0))}
        </div>
    );
}

export default TreeView;
