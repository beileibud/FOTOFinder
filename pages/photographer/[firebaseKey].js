import React from 'react';
import PhotographerCard from '../../components/PhotographerCard';
import SideNavBar from '../../components/SideNavBar';

export default function AddPhoto() {
  return (
    <div style={{ display: 'flex', marginTop: '50px' }}>
      <div className="sideNavBar">
        <SideNavBar />
      </div>
      <div className="profile-main">
        <PhotographerCard />
      </div>
    </div>
  );
}
