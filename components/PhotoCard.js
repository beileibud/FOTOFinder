/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { deleteSinglePhoto } from '../api/photoData';

function PhotoCard({ photoObj, onUpdate }) {
  console.warn(photoObj);
  // FOR DELETE, WE NEED TO REMOVE THE BOOK AND HAVE THE VIEW RERENDER,
  // SO WE PASS THE FUNCTION FROM THE PARENT THAT GETS THE BOOKS
  const deleteThisPhoto = () => {
    if (window.confirm(`Delete ${photoObj.photographer_name}?`)) {
      deleteSinglePhoto(photoObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={photoObj.image} alt={photoObj.photographer_name} style={{ height: '400px' }} />
      <Card.Body>
        <p className="card-text">{photoObj.favorite && <span>Favorite<br /></span>}</p> {/* Render 'Favorite' text if favorite is true */}
        <Button variant="white" onClick={deleteThisPhoto} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

PhotoCard.propTypes = {
  photoObj: PropTypes.shape({
    image: PropTypes.string,
    photographer_name: PropTypes.string,
    favorite: PropTypes.bool,
    firebaseKey: PropTypes.string,
    photographer_uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PhotoCard;
