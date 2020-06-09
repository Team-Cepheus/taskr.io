import React, { useState } from 'react';

const LoginForm = () => {

    const [ username , setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const [error, setError ] = useState(null)

    const onSubmit = (e) => {
        e.preventDefault();
        if(!password || ! username){
            setError('Please enter username and password')
        }

    }

    return (
        <form onSubmit={onSubmit}>
            <input type="text" placeholder="Username" name="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            { error && <p className="error-text">{error}</p>}
            <button className="btn" type="submit">LOGIN</button>
        </form>
    );
}

export default LoginForm;