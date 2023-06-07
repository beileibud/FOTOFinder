/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { getUsers } from '../api/userData';
import PhotographerCard from '../components/PhotographerCard';

function Photographers() {
  const [photographers, setPhotographer] = useState([]);

  const getAllThePhotographers = () => {
    getUsers().then(setPhotographer);
  };

  useEffect(() => {
    getAllThePhotographers();
  }, []);

  return (
    <div>
      <h2>photographer</h2>
      <div className="d-flex flex-wrap">
        {/* TODO: map over books here using BookCard component */}
        {photographers.map((photo) => (
          <PhotographerCard key={photo.firebaseKey} obj={photo} onUpdate={getAllThePhotographers} />
        ))}
      </div>
    </div>
  );
}

export default Photographers;
