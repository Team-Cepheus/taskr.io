import React, { useState } from 'react';
import { config } from '../../config';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { authorize, setAuthData } from '../../redux/auth_actions';
import { trackPromise } from 'react-promise-tracker';



const SignupForm = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();

    const onSubmit = async (e) => {
        e.preventDefault()
        if (password.trim().length < 6) {
            setError('Password should be 6 or more characters long')
        } else {
            try {
                const response = await trackPromise(fetch(`${config.apiURL}/users`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password, name, username })
                }));

                const data = await response.json();
                if (!response.ok) {
                    if (data.message) {
                        throw new Error(data.message)
                    } else if (data.error.message) {
                        throw new Error('Password cannot contain "password"')
                    }
                }

                console.log(data)
                window.localStorage.setItem('auth', JSON.stringify({
                    value: data,
                }));
                dispatch(authorize())
                dispatch(setAuthData(data))
                history.push('/dashboard');
            } catch (e) {
                setError(e.toString())
            }
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <input type="text" placeholder="Name" required
                onChange={(e) => setName(e.target.value)}
            />
            <input type="text" placeholder="Username" required
                onChange={(e) => setUsername(e.target.value)}
            />
            <input type="email" placeholder="Email" required
                onChange={(e) => setEmail(e.target.value)}
            />
            <input type="password" name="" placeholder="Password" required
                onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="error-text">{error}</p>}
            <button className="btn" type="submit">SIGN UP</button>

        </form>
    );
}

export default SignupForm;