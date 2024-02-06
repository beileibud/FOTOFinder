import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { Col, Row } from 'react-bootstrap';
import { deleteSinglePhoto } from '../api/photoData';
import { useAuth } from '../utils/context/authContext';

function PhotoCard({ photoObj, onUpdate }) {
  const { user } = useAuth();

  const deleteThisPhoto = () => {
    if (window.confirm(`Delete ${photoObj.photographer_name}?`)) {
      deleteSinglePhoto(photoObj.firebaseKey).then(() => onUpdate());
    }
  };

  const handleKeyDown = (event) => {
    // Handle keyboard interactions if needed
    if (event.key === 'Enter' || event.key === ' ') {
      deleteThisPhoto();
    }
  };

  return (
    <Card className="mb-3 photo-card" bg="transparent">
      <Link href={`/photographer/photographerProfile?firebaseKey=${photoObj.photographer_id}`} passHref>
        <div className="photo-card-image">
          <img src={photoObj.image} alt={photoObj.photographer} />
        </div>
      </Link>
      <Card.Body className="photo-card-body" style={{ marginTop: '-0.8rem', marginLeft: '-1rem', justifyContent: 'space-between' }}>
        <Row>
          <Col sm={9}>
            {photoObj.favorite && (
              <p className="card-text" style={{ marginBottom: '-0.2rem' }}>
                Favorite
              </p>
            )}
            {photoObj.type}
          </Col>
          <Col sm={3} style={{ marginTop: '-2.2rem', marginRight: '-0.5rem' }}>
            {photoObj.uid === user.uid ? (
              <div
                role="button" // Adding role for accessibility
                tabIndex={0}
                onClick={deleteThisPhoto}
                onKeyDown={handleKeyDown} // Handling keyboard events
                className="mt-3 black-button-svg"
                style={{ cursor: 'pointer', padding: '1rem' }}

              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style={{ height: '20px', width: '20px' }}>
                  {/* Font Awesome SVG path */}
                  <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                </svg>
              </div>
            ) : null}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

PhotoCard.propTypes = {
  photoObj: PropTypes.shape({
    image: PropTypes.string,
    photographer: PropTypes.string,
    type: PropTypes.string,
    uid: PropTypes.string,
    photographer_name: PropTypes.string,
    favorite: PropTypes.bool,
    firebaseKey: PropTypes.string,
    photographer_id: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PhotoCard;
