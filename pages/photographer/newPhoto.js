import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { createPhotos } from '../../api/photoData';
import PhotoForm from '../../components/forms/PhotoForm';
import PhotographerCard from '../../components/PhotographerCard';
import { getUserByUID } from '../../api/photographerData';
import { useAuth } from '../../utils/context/authContext';

export default function AddPhoto() {
  const [photos, setPhotos] = useState([]);
  const [photographer, setPhotographer] = useState(null);
  const router = useRouter();
  const { user } = useAuth();

  const getSinglePhotographer = () => {
    getUserByUID(user.uid).then(setPhotographer);
  };

  useEffect(() => {
    getSinglePhotographer();
  }, []);

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
      <div className="sideProfileNav">
        {photographer && <PhotographerCard obj={photographer} onUpdate={getSinglePhotographer} />}
      </div>
      <div className="profile-main">
        <PhotoForm photoObj={{}} photographer_id={photographerId} onSubmit={handlePhotoSubmit} />
      </div>
    </div>
  );
}
