import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export default function ManageUsers() {
    const [users, setUsers] = useState([]);
    const [openedUserId, setOpenedUserId] = useState(null); // Для отслеживания открытого пользователя
    const [savedUsers, setSavedUsers] = useState([]);
    const [deletedUser, setDeletedUser] = useState([]);
    const [userHeight, setUserHeight] = useState(300);

    const formVariants = {
        hidden: { opacity: 0, height: 0 },
        visible: { opacity: 1, height: 'auto' },
        exit: { opacity: 0, height: 0 }
    };

    const openUser = (userId) => {
        if (openedUserId === userId) {
            setOpenedUserId(null); 
            setUserHeight(300); 
        } else {
            setOpenedUserId(userId);
            setUserHeight(650); 
        }
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
                const res = await fetch('/api/users/updateUser', {
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
                if (res.ok) {
                    setSavedUsers((prevSavedUsers) => [...prevSavedUsers, user._id]);
                    setTimeout(() => {
                        setSavedUsers((prevSavedUsers) =>
                            prevSavedUsers.filter((id) => id !== user._id)
                        );
                    }, 2000);
                }
            } catch (error) {
            }
        }
    }

    const deleteUser = async (user) => {
        const token = Cookies.get('token');
        if (token) {
            try {
                const res = await fetch('/api/users/deleteUser', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        userId: user._id
                    }),
                });
                const data = await res.json();
                if (res.ok) {
                    console.log('User has been deleted successfully');
                    setDeletedUser((prevSavedUser) => [...prevSavedUser, user._id]);
                    setTimeout(() => {
                        setDeletedUser((prevSavedUser) =>
                            prevSavedUser.filter((id) => id !== user._id)
                        );
                    }, 2000);
                    manageUsers();
                } 
            } catch (error) {
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
                    setUsers(data.users); 
                } else {
                    setUsers([]);
                }
            }
        } catch (error) {
        }
    }

    useEffect(() => {
        manageUsers();
    }, [])

    return (
        <div className="container">
            <div
                id='manageUsersDiv'
                className="manage"
                style={{ maxHeight: `${userHeight}px` }}
            >
                {users && users.length > 0 ? (
                    <ul className='manageUl'>
                        {users.map((mappingUser) => (
                            <li key={mappingUser._id} className='manageLi'>
                                <div
                                    id={mappingUser._id}
                                    className="listDiv"
                                    onClick={() => { openUser(mappingUser._id); }}
                                >
                                    {mappingUser.username}
                                </div>

                                {openedUserId === mappingUser._id && (
                                    <form
                                        key={mappingUser._id}
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
                                        <div className='buttons'>
                                            <button className="btn" onClick={(e) => {
                                                e.preventDefault();
                                                saveChanges(mappingUser);
                                            }} style={{
                                                backgroundColor: savedUsers.includes(mappingUser._id) ? 'green' : ''
                                            }}>
                                                Save changes
                                            </button>
                                            <button className="btn" onClick={(e) => {
                                                e.preventDefault();
                                                deleteUser(mappingUser);
                                            }} style={{
                                                backgroundColor: deletedUser.includes(mappingUser._id) ? 'green' : ''
                                            }}>
                                                Delete
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </li>
                        ))}
                    </ul>
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