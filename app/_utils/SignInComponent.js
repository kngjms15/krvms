// SignInComponent.js
import React, { useState } from 'react';
import { useAuth } from './auth-context'; // Adjust the path as necessary

const SignInComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { emailSignIn } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await emailSignIn(email, password);
            console.log('Logged in successfully!');
        } catch (error) {
            console.error('Failed to log in:', error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Email:
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </label>
            <button type="submit">Log In</button>
        </form>
    );
};

export default SignInComponent;
