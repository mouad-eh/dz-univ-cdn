import React, { useState } from 'react';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`Email: ${email}, Password: ${password}`);
        navigate('/main');
    }

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <label>
                    Email:<br />
                    <input type="email" value={email} onChange={handleEmailChange} />
                </label>
                <label>
                    Password:<br />
                    <input type="password" value={password} onChange={handlePasswordChange} />
                </label>
                <button type="submit">Log In</button>
            </form>
        </div >
    );
}

export default LoginPage;
