import React from 'react'
import ProfileCard from './profilecard/ProfileCard';
import Posts from './Posts/Posts';
const ProfileMiddle = () => {
  return (
    <>
    <div class="middle">
    <div className="profile-center">
          <ProfileCard location="profilePage"/>
          <Posts/>
          
        </div>
    </div>
    </>
  )
}

export default ProfileMiddle