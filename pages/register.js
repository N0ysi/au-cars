import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Header from '@/components/Header';

const Register = () => {
    const router = useRouter();
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        });

        const data = await res.json();
        if (res.ok) {
            router.push('/login');
        } else {
            if (typeof data.message === 'object') {
                setError(JSON.stringify(data.message)); 
            } else {
                setError(data.message);
            }
        }
    };

    return (
        <div>
            <Header />
            <div className="authDiv">
                <img src='/img/login.svg' alt="Register" />
                <h1 className="title">Register</h1>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form className="paymentForm" onSubmit={handleSubmit}>
                    <input
                        type="username"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="UserName"
                        required
                    />
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
                    <div className='login'>
                        <button className="btn" type="submit">Register</button>
                        <Link href="/login" className="link">
                            <p>Login in?</p>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;