import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Socials from '@/components/Socials';

const Login = () => {
    const router = useRouter();
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
            body: JSON.stringify({ email, password }),
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
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
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
                <Link href="/register" className="link">
                    <p>Not registered yet?</p>
                </Link>
            </form>
            <Socials />
        </div>
    );
};

export default Login;