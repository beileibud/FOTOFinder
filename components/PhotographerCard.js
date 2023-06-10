/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteSingleUser } from '../api/userData';

function PhotographerCard({ obj, onUpdate }) {
  const deleteThisPhotographer = () => {
    if (window.confirm(`Delete ${obj.name}?`)) {
      deleteSingleUser(obj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={obj.image} alt={obj.name} style={{ height: '400px' }} />
      <Card.Body>
        <p className="card-text">{obj.name}</p> {/* Render 'Favorite' text if favorite is true */}
        <div>
          <Link href={`/photographer/edit/${obj.firebaseKey}`} passHref>
            <Button variant="outline-warning" style={{ height: '100%' }}>
              EDIT
            </Button>
          </Link>
        </div>
        <Button variant="white" onClick={deleteThisPhotographer} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

PhotographerCard.propTypes = {
  obj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    phone: PropTypes.string,
    zipcode: PropTypes.string,
    type: PropTypes.string,
    firebaseKey: PropTypes.string,
    photographer_uid: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PhotographerCard;
