import React from 'react';
import './MainPage.css';
import Header from './Header';
import TreeView from './TreeView';

export default function MainPage() {
    return (
        <div className="app-container">
            <Header />
            <div className="main-container">
                <div className="sidebar">
                    <TreeView />
                </div>
                <div className="file-preview">
                    {/* Add file preview component here */}
                </div>
            </div>
        </div>
    )
}
