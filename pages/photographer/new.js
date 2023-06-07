import React from 'react';
import PhotographerForm from '../../components/forms/PhotographerForm';
import SideNavBar from '../../components/SideNavBar';

export default function AddPhotographer() {
  return (
    <div style={{ display: 'flex' }}>
      <div className="sideNavBar">
        <SideNavBar />
      </div>
      <div className="profile-main">
        <PhotographerForm />
      </div>
    </div>
  );
}
