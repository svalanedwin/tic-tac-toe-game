import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login, register } from 'shared/redux/actions/authActions';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isRegistering) {
                await dispatch(register({ email, password, name: 'User' }));
                alert('Registration successful! Please log in.');
            } else {
                await dispatch(login({ email, password }));
                alert('Login Successful!');
            }
        } catch (error) {
            alert('Error occurred. Please try again.');
        }
    };

    return (
        <div>
            <h2>{isRegistering ? 'Register' : 'Login'}</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
            </form>
            <button onClick={() => setIsRegistering(!isRegistering)}>
                {isRegistering ? 'Already have an account? Log in' : 'Need an account? Register'}
            </button>
        </div>
    );
};

export default Login;
