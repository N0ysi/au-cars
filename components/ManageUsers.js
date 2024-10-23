import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Cookies from 'js-cookie';

export default function ManageUsers() {
    const [users, setUsers] = useState([]);
    const [openedUserId, setOpenedUserId] = useState(null); // Для отслеживания открытого пользователя
    const [savedUsers, setSavedUsers] = useState([]);

    const formVariants = {
        hidden: { opacity: 0, height: 0 },
        visible: { opacity: 1, height: 'auto' },
        exit: { opacity: 0, height: 0 }
    };

    const openUser = (userId) => {
        console.log('openUser id', userId);
        setOpenedUserId((prevUserId) => (prevUserId === userId ? null : userId));
    };

    const handleInputChange = (e, userId, field) => {
        const { value } = e.target;
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user._id === userId ? { ...user, [field]: value } : user
            )
        );
    };

    const saveChanges = async (user) => {
        const token = Cookies.get('token');
        if (token) {
            try {
                const res = await fetch('/api/manager/updateUser', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        userId: user._id,
                        username: user.username,
                        email: user.email,
                        password: user.password,
                        role: user.role,
                    }),
                });
                const data = await res.json();
                console.log('saveChanges', data);
                if (res.ok) {
                    console.log('User updated successfully');
                    // Добавляем пользователя в массив savedUsers для изменения цвета кнопки
                    setSavedUsers((prevSavedUsers) => [...prevSavedUsers, user._id]);
                    setTimeout(() => {
                        setSavedUsers((prevSavedUsers) =>
                            prevSavedUsers.filter((id) => id !== user._id)
                        );
                    }, 2000);
                } else {
                    console.error(data.message);
                }
            } catch (error) {
                console.error('Error updating user:', error);
            }
        }
    }

    const manageUsers = async () => {
        try {
            const res = await fetch('/api/manager/manageUsers', {
                method: 'GET',
                cache: 'no-store'
            });

            const data = await res.json();
            if (res.ok) {
                if (data && Array.isArray(data.users)) {
                    setUsers(data.users);  // Присваиваем массив автомобилей из объекта
                    console.log('setUsers', users);
                } else {
                    console.error("not array:", users);
                    setUsers([]); // Очищаем список автомобилей в случае ошибки
                }
            } else {
                console.error("Error getting users:", data.error);
            }
        } catch (error) {
            console.error('Error getting users:', error);
        }
    }

    useEffect(() => {
        manageUsers();
    }, [])

    return (
        <div className="container">
            <div id='manageUsersDiv' className="manage">
                <p className="title">Manage users:</p>
                {users && users.length > 0 ? (
                    users.map((mappingUser) => (
                        <div key={mappingUser._id}>
                            {/* Кнопка для открытия формы */}
                            <button
                                id={mappingUser._id}
                                className="manageBtn"  // Устанавливаем класс userBtn
                                onClick={() => { openUser(mappingUser._id);}}
                            >
                                {mappingUser.username}
                            </button>

                            {/* Анимация формы */}
                            <AnimatePresence>
                                {openedUserId === mappingUser._id && (
                                    <motion.form
                                        key={mappingUser._id}
                                        className="authForm"
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        variants={formVariants}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <input
                                            type="text"
                                            value={mappingUser.username}
                                            onChange={(e) => handleInputChange(e, mappingUser._id, 'username')}
                                            placeholder="Username"
                                        />
                                        <input
                                            type="email"
                                            defaultValue={mappingUser.email}
                                            onChange={(e) => handleInputChange(e, mappingUser._id, 'email')}
                                            placeholder="Email"
                                        />
                                        <input
                                            type="password"
                                            onChange={(e) => handleInputChange(e, mappingUser._id, 'password')}
                                            placeholder="Password"
                                        />
                                        <input
                                            type="text"
                                            defaultValue={mappingUser.role}
                                            onChange={(e) => handleInputChange(e, mappingUser._id, 'role')}
                                            placeholder="Role"
                                        />
                                        <button className="btn" onClick={(e) => {
                                            e.preventDefault();
                                            saveChanges(mappingUser);
                                        }} style={{
                                            backgroundColor: savedUsers.includes(mappingUser._id) ? 'green' : ''
                                        }}>
                                            Save changes
                                        </button>
                                        <button className="btn">Delete</button>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </div>
                    ))
                ) : (
                    <div className="text">
                        <p>(if you see this, something went wrong)</p>
                        <p>We have no users</p>
                    </div>
                )}
            </div>
        </div>
    );
}