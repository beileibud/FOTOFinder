import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { createPhotos, getPhotographersPhotos } from '../../api/photoData';
import PhotoForm from '../../components/forms/PhotoForm';
import SideNavBar from '../../components/SideNavBar';
import { viewPhotographersDetail } from '../../api/mergeData';

export default function AddPhoto() {
  const [, setSingleP] = useState({});
  const [photos, setPhotos] = useState([]);
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    viewPhotographersDetail(firebaseKey).then(setSingleP);
  }, [firebaseKey]);

  useEffect(() => {
    getPhotographersPhotos(firebaseKey).then(setPhotos);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePhotoSubmit = (photo) => {
    createPhotos(firebaseKey, photo)
      .then((data) => {
        setPhotos([...photos, data]);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div style={{ display: 'flex', marginTop: '50px', minHeight: '100vh' }}>
      <div className="sideNavBar">
        <SideNavBar />
      </div>
      <div className="profile-main">
        <PhotoForm photoObj={{}} photographer_id={firebaseKey || ''} onSubmit={handlePhotoSubmit} />
      </div>
    </div>
  );
}
