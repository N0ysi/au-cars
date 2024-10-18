import Dashboard from '@/components/Dashboard';
import Header from '@/components/Header';
import OtherInfo from '@/components/OtherInfo';
import Socials from '@/components/Socials';
import UserInfo from '@/components/UserInfo';
import React from 'react';
import { useAuth } from '@/context/AuthContext';

export default function Profile() {
  const { user } = useAuth();
  const userStr =
    console.log("User", user);
  return (
    <div>
      <Header />
      <div className="container">
        <UserInfo />
        <OtherInfo />
        {
          user?.role != 'user' ? (
            <Dashboard />
          ) : (null)
        }
      </div>
      <Socials />
    </div>
  );
};
