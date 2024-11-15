import React, { useState } from 'react';

export default function AddUser() {
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState('');
    const [savedUser, setSavedUser] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Submitting registration with:", { username, email, password, role }); // Логирование данных перед отправкой

        const res = await fetch('/api/manager/addUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password, role }),
        });

        const data = await res.json();
        console.log(data);
        if (res.ok) {
            console.log('success');
            setSavedUser((prevSavedUser) => [...prevSavedUser, email]);
            setTimeout(() => {
                setSavedUser((prevSavedUser) =>
                    prevSavedUser.filter((email) => email !== email)
                );
            }, 2000);
        } else {
            if (typeof data.message === 'object') {
                setError(JSON.stringify(data.message)); // Преобразуем объект в строку
            } else {
                setError(data.message); // Если строка — просто выводим
            }
        }
    };

    return (
        <div className="container">
            <p className="title">Add user:</p>
            <div className="description">
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div className="manageDiv">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="username"
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                            placeholder="Username"
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
                        <input
                            type="text"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            placeholder="role"
                        />
                        <button className="btn" type="submit"
                            style={{ backgroundColor: savedUser.includes(email) ? 'green' : '' }}>
                            Add</button>
                    </form>
                </div>
            </div>
        </div>
    )
}