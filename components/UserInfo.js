import React from "react";
import { useAuth } from '../context/AuthContext';


export default function UserInfo() {
    const { user } = useAuth();
    return (
        <div className="userInfo">
            <h1 className="title">Username: {user?.username || 'Unkown'}</h1>
            <p>Email: {user?.email || 'Unkown'}</p>
            <p>Role: {user?.role || 'Unkown'}</p>
        </div>
    );
}