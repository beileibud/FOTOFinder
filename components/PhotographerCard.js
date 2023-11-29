/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import { deleteSinglePhotographer } from '../api/photographerData';

function PhotographerCard({
  obj,
  onUpdate,
  onlyImageAndName,
  onlyAboutMe,
}) {
  const { user } = useAuth();

  if (onlyImageAndName) {
    return (
      <div style={{ fontFamily: 'Mont-ExtraLightDEMO', fontSize: '17px', width: '10rem' }}>
        <Link className="photographer-card-image" href={`/photographer/photographerProfile?firebaseKey=${obj.firebaseKey}`} passHref>
          <img src={obj.image} alt={obj.name} style={{ marginTop: '1rem', width: '10rem', alignText: 'end' }} />
        </Link>
        <p style={{ marginBottom: '-0.2rem' }}>
          {obj.name} , {obj.zipcode}
        </p>
        {obj.type && obj.type.length > 0 && <p style={{ alignText: '' }}>Type: {obj.type.join(', ')}</p>}
      </div>
    );
  }

  if (onlyAboutMe) {
    return (
      <div>
        <p>{obj.about}</p>
      </div>
    );
  }

  const deleteThisPhotographer = () => {
    if (window.confirm(`Delete ${obj.name}?`)) {
      deleteSinglePhotographer(obj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card className="mb-3 photographer-card" style={{ width: '10rem', alignItems: 'center' }} bg="transparent">
      <div className="card-content">
        {obj.uid === user.uid ? (
          <Link className="photographer-card-image" href={`/photographer/photographerProfile?firebaseKey=${obj.firebaseKey}`} passHref>
            <img
              src={obj.image}
              alt={obj.name}
              style={{
                height: '100px',
                width: '100px',
                borderRadius: '50%',
                marginRight: '10px',
              }}
            />
          </Link>
        ) : (
          <Link className="photographer-card-image" href={`/photographer/photographerProfile?firebaseKey=${obj.firebaseKey}`} passHref>
            <img
              src={obj.image}
              alt={obj.name}
              style={{
                height: '100px',
                width: '100px',
                borderRadius: '50%',
                marginRight: '10px',
              }}
            />
          </Link>
        )}
      </div>
      <Card.Body className="photographer-card-type" style={{ margin: '-0.5rem' }}>
        <p className="card-text" style={{ marginBottom: '0.2rem', textAlign: 'center', fontFamily: 'Mont-ExtraLightDEMO' }}>
          {obj.name}
        </p>
        {obj.type && obj.type.length > 0 && (
          <p className="card-text" style={{ marginBottom: '0.2rem', textAlign: 'center', fontFamily: 'Mont-ExtraLightDEMO' }}>
            Types: {obj.type.join(', ')}
          </p>
        )}
        <Link href={`/photographer/photographerProfile?firebaseKey=${obj.firebaseKey}`} passHref>
          <Button className="btn-card-grapher" variant="white" style={{ marginBottom: '-1rem', fontSize: '70px', textDecoration: 'underline 2px' }}>
            ABOUT
          </Button>
        </Link>
        {obj.uid === user.uid ? (
          <Link href={`/photographer/photos?firebaseKey=${obj.firebaseKey}`} passHref>
            <Button className="btn-card-grapher" variant="white" style={{ marginBottom: '-0.2rem', fontSize: '50px', textDecoration: 'underline 2px' }}>
              POTFOLIO
            </Button>
          </Link>
        ) : (
          <Link href={`/photographer/otherPhotos?firebaseKey=${obj.firebaseKey}`} passHref>
            <Button className="btn-card-grapher" variant="white" style={{ marginBottom: '-0.2rem', fontSize: '50px', textDecoration: 'underline 2px' }}>
              POTFOLIO
            </Button>
          </Link>
        )}
        {obj.uid === user.uid ? (
          <Link href={`/photographer/newPhoto?firebaseKey=${obj.firebaseKey}`} passHref>
            <Button className="btn-card-grapher" variant="white" style={{ marginBottom: '0.2rem', fontSize: '44px', textDecoration: 'underline 2px' }}>
              ADD PHOTO
            </Button>
          </Link>
        ) : null}
        {obj.uid === user.uid ? (
          <Link href={`/photographer/appointments?firebaseKey=${obj.firebaseKey}`} passHref>
            <Button className="btn-card-grapher" variant="white" style={{ marginBottom: '0.2rem', fontSize: '37px', textDecoration: 'underline 2px' }}>
              APPOINTMENS
            </Button>
          </Link>
        ) : null}
      </Card.Body>
      {obj.uid === user.uid ? (
        <Link href={`/photographer/edit/${obj.firebaseKey}`} passHref>
          <Button variant="light" className="btn-card-grapher__gone" style={{ fontFamily: 'Mont-ExtraLightDEMO' }}>
            Edit Account
          </Button>
        </Link>
      ) : null}
      {obj.uid === user.uid ? (
        <Button variant="light" className="btn-card-grapher__gone" style={{ fontFamily: 'Mont-ExtraLightDEMO' }} onClick={deleteThisPhotographer}>
          Delete Account
        </Button>
      ) : null}
      {obj.uid === user.uid ? (
        <Button variant="light" type="button" className="btn-card-grapher__gone mt-5" style={{ backgroundColor: ' rgb(103, 94, 82, 0.1)' }} onClick={signOut}>
          Sign Out
        </Button>
      ) : null}
    </Card>
  );
}

PhotographerCard.propTypes = {
  obj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    phone: PropTypes.string,
    zipcode: PropTypes.string,
    about: PropTypes.string,
    checkUser: PropTypes.bool,
    type: PropTypes.arrayOf(PropTypes.string),
    firebaseKey: PropTypes.string,
    photographer_id: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onlyImageAndName: PropTypes.bool,
  onlyAboutMe: PropTypes.bool,
};

PhotographerCard.defaultProps = {
  onlyImageAndName: false,
  onlyAboutMe: false,
};

export default PhotographerCard;
