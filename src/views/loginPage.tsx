import React, { useState } from 'react';
import "./../style/login.css";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    //   const handleLogin = (e) => {
    //     e.preventDefault();

    //     // Basic form validation
    //     if (!email || !password) {
    //       setErrorMessage('Please enter both email and password.');
    //       return;
    //     }

    //     // Replace this with your login logic (e.g., API request, authentication)
    //     // For demo purposes, we'll just log the email and password
    //     console.log('Email:', email);
    //     console.log('Password:', password);

    //     // Clear form and error message
    //     setEmail('');
    //     setPassword('');
    //     setErrorMessage('');
    //   };

    return (
        <div className="container">
            <form className="login-form" >
                <h2>Login Page</h2>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input-field"
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input-field"
                    />
                </div>
                <button type="submit" className="login-button">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;