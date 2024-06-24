import React from 'react';
// import './profileLeft.css';

// import FollowersCard from '../followerCards/FollowersCard'
import InfoCard from '../InfoCard/InfoCard'
import RightSide from '../right/RightSide';
const ProfileLeft = () => {
  return (
      <>
    <div className="profileSide">
      
        <InfoCard/>
        <RightSide/>
    </div>
  </>
  )
}

export default ProfileLeft