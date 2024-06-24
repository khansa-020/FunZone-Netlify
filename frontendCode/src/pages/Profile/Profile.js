import React from 'react';
import ProfileLeft from '../../components/ProfileLeft/ProfileLeft';

import './profile.css';
import ProfileMiddle from '../../components/ProfileMiddle';
import LeftSide from '../../components/left/LeftSide';
const Profile = () => {
  return (
      <>
        <main>
            <div className="Container">
            <LeftSide/>
            <ProfileMiddle/>
            <ProfileLeft/>
            </div>
        </main>
    </>
  )
}

export default Profile