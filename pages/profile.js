import AddCar from '@/components/AddCar';
import Header from '@/components/Header';
import OtherInfo from '@/components/OtherInfo';
import Socials from '@/components/Socials';
import UserInfo from '@/components/UserInfo';
import ManageUsers from '@/components/ManageUsers';
import React from 'react';
import { useAuth } from '@/context/AuthContext';

export default function Profile() {
  const { user } = useAuth();

  return (
    <div>
      <Header />
      <div className="container">
        <UserInfo />
        <OtherInfo />
        {
          user?.role != 'user' ? (
            <div className='container'>
              <AddCar />
              <ManageUsers />
            </div>
          ) : (null)
        }
      </div>
      <Socials />
    </div>
  );
};
