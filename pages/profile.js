import AddCar from '@/components/AddCar';
import Header from '@/components/Header';
import OtherInfo from '@/components/OtherInfo';
import AddUser from '@/components/AddUser';
import UserInfo from '@/components/UserInfo';
import ManageUsers from '@/components/ManageUsers';
import { useAuth } from '@/context/AuthContext';
import ManageCars from '@/components/ManageCars';
import { useState } from 'react';
import FavoriteCars from '@/components/FavoriteCars';

export default function Profile() {
  const { user } = useAuth();

  const [isAddCarVisible, setIsAddCarVisible] = useState(false);
  const [isManageCarsVisible, setIsManageCarsVisible] = useState(false);
  const [isAddUserVisible, setIsAddUserVisible] = useState(false);
  const [isManageUsersVisible, setIsManageUsersVisible] = useState(false);

  return (
    <div>
      <Header />
      <div className="container">
        <UserInfo />
        {
          user?.role != 'user' ? (
            <div className='container'>
              <p className="title">Manage cars:</p>
              <div id='carsDiv' className='cars'>
                <button className='btn' onClick={() => setIsAddCarVisible(!isAddCarVisible)}>
                  {isAddCarVisible ? 'Hide Add Car' : 'Show Add Car'}
                </button>
                {isAddCarVisible && <AddCar />}
                <button className='btn' onClick={() => setIsManageCarsVisible(!isManageCarsVisible)}>
                  {isManageCarsVisible ? 'Hide Manage Cars' : 'Show Manage Cars'}
                </button>
                {isManageCarsVisible && <ManageCars />}
              </div>
              <div id='usersDiv' className='users'>
                <p className="title">Manage users:</p>
                <button className='btn' onClick={() => setIsAddUserVisible(!isAddUserVisible)}>
                  {isAddUserVisible ? 'Hide Add User' : 'Show Add User'}
                </button>
                {isAddUserVisible && <AddUser />}
                <button className='btn' onClick={() => setIsManageUsersVisible(!isManageUsersVisible)}>
                  {isManageUsersVisible ? 'Hide Manage Users' : 'Show Manage Users'}
                </button>
                {isManageUsersVisible && <ManageUsers />}
              </div>
            </div>
          ) : (
            <div className='container'>
              <OtherInfo />
              <FavoriteCars />
            </div>
          )
        }
      </div>
    </div>
  );
};
