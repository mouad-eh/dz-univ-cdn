import React from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    return (
        <header className="header">
            <div className="header-title">Dz Univ</div>
            <div className="header-user">
                <span>Admin</span>
                <button onClick={() => navigate('/')}>Logout</button>
            </div>
        </header>
    );
};

export default Header; 