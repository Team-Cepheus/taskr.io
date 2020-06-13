import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { config } from '../../config';
import { authorize, setAuthData } from '../../redux/auth_actions';
import { useHistory } from 'react-router-dom';
import useCheckAuth from '../../helpers/checkAuth';

const LoginForm = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const dispatch = useDispatch()
    const history = useHistory()

    useCheckAuth();

    const onSubmit = (e) => {
        e.preventDefault();
        if (!password || !email) {
            setError('Please enter both email and password')
        } else {
            fetch(`${config.apiURL}/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            })
                .then((resp) => {
                    if (!resp.ok) {
                        throw new Error('Invalid Credentials');
                    }
                    return resp.json();
                })
                .then((data) => {
                    console.log(data)
                    window.localStorage.setItem('auth', JSON.stringify({
                        value: data,
                    }));
                    dispatch(authorize())
                    dispatch(setAuthData(data))
                    history.push('/dashboard');
                })
                .catch((_) => {
                    setError('Invalid Credentials');
                })
        }

    }

    return (
        <form onSubmit={onSubmit}>
            <input
                type="email"
                placeholder="Email"
                name="email" value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="error-text">{error}</p>}
            <button className="btn" type="submit">LOGIN</button>
        </form>
    );
}

export default LoginForm;