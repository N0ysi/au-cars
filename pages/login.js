import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Login = () => {
    const router = useRouter();
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        });

        const data = await res.json();
        console.log(data);
        if (res.ok) {
            router.push('/'); // Перенаправление на главную страницу
        } else {
            setError(data.message);
        }
    };

    return (
        <div className="authDiv">
            <h1 className="title">Login</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form className="authForm" onSubmit={handleSubmit}>
                <input
                    type="username"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="UserName"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button className="authBtn" type="submit">Login</button>
            </form>
            <Link href="/register" className="link">
                <p>Not registered yet?</p>
            </Link>
        </div>
    );
};

export default Login;