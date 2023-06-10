/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getPhotos } from '../api/photoData';
import PhotoCard from '../components/PhotoCard';

function Photos() {
  const [photos, setPhotos] = useState([]);
  const router = useRouter();
  const { query } = router;

  const getAllThePhotos = () => {
    getPhotos().then((data) => {
      const filterPhotos = query.type ? data.filter((photo) => photo.type === query.type) : data;
      setPhotos(filterPhotos);
    });
  };

  useEffect(() => {
    getAllThePhotos();
  }, [query.type]);

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
