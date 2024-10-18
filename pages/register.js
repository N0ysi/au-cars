import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Socials from '@/components/Socials';

const Register = () => {
    const router = useRouter();
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Submitting registration with:", { username, email, password }); // Логирование данных перед отправкой

        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        });

        const data = await res.json();
        console.log(data);
        if (res.ok) {
            router.push('/login'); // Перенаправление на страницу входа
        } else {
            if (typeof data.message === 'object') {
                setError(JSON.stringify(data.message)); // Преобразуем объект в строку
            } else {
                setError(data.message); // Если строка — просто выводим
            }
        }
    };

    return (
        <div className="authDiv">
            <img src='/img/login.svg' />
            <h1 className="title">Register</h1>
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
            <Socials />
        </div>
    );
};

export default Register;