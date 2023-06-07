/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { getPhotos } from '../api/photoData';
import PhotoCard from '../components/PhotoCard';

function Photos() {
  const [photos, setPhotos] = useState([]);

  const getAllThePhotos = () => {
    getPhotos().then(setPhotos);
  };

  useEffect(() => {
    getAllThePhotos();
  }, []);

  return (
    <div>
      <h2>photos</h2>
      <div className="d-flex flex-wrap">
        {/* TODO: map over books here using BookCard component */}
        {photos.map((photo) => (
          <PhotoCard key={photo.firebaseKey} photoObj={photo} onUpdate={getAllThePhotos} />
        ))}
      </div>
    </div>
  );
}

export default Photos;
