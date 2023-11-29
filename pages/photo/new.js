import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { createPhotos } from '../../api/photoData';
import PhotoForm from '../../components/forms/PhotoForm';
import SideNavBar from '../../components/SideNavBar';

export default function AddPhoto() {
  const [photos, setPhotos] = useState([]);
  const router = useRouter();

  const handlePhotoSubmit = (photo) => {
    createPhotos(photo.photographer_id, photo)
      .then((data) => {
        setPhotos([...photos, data]);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const photographerId = router.query.firebaseKey; // Access the firebaseKey query parameter

  return (
    <div style={{ display: 'flex', marginTop: '50px', minHeight: '100vh' }}>
      <div className="sideNavBar">
        <SideNavBar />
      </div>
      <div className="profile-main">
        <PhotoForm photoObj={{}} photographer_id={photographerId} onSubmit={handlePhotoSubmit} />
      </div>
    </div>
  );
}
