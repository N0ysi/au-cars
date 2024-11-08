import AddCar from '@/components/AddCar';
import Header from '@/components/Header';
import OtherInfo from '@/components/OtherInfo';
import Socials from '@/components/Socials';
import UserInfo from '@/components/UserInfo';
import ManageUsers from '@/components/ManageUsers';
import { useAuth } from '@/context/AuthContext';
import ManageCars from '@/components/ManageCars';
import { useState } from 'react';

export default function Profile() {
  const { user } = useAuth();

  const [isAddCarVisible, setIsAddCarVisible] = useState(false);
  const [isManageCarsVisible, setIsManageCarsVisible] = useState(false);

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
              <ManageUsers />
            </div>
          ) : (
            <OtherInfo />
          )
        }
      </div>
    </div>
  );
};
