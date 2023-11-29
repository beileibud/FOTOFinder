import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import { deleteSingleAppointments } from '../api/appointmentData';
import { getPhotographers } from '../api/photographerData';

function AppointmentCard({ appObj, onUpdate }) {
  const [, setPhotographer] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    getPhotographers().then((photographerData) => {
      const photographerObj = photographerData.find((p) => p.firebaseKey === appObj.photographer_id);
      setPhotographer(photographerObj ? photographerObj.name : '');
    });
  }, [appObj.photographer_id]);

  const deleteAppointments = () => {
    if (window.confirm(`Delete ${appObj.client_name}?`)) {
      deleteSingleAppointments(appObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card
      style={{
        width: '100%',
        color: 'black',
        height: '20%',
        backgroundColor: 'transparent',
      }}
    >
      <Card.Body style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Card.Text style={{ textDecoration: 'underline 1.5px' }}>
          <p>DATE:</p>
          {appObj.date}
        </Card.Text>
        <Card.Text style={{ textDecoration: 'underline 1.5px' }}>
          <p>CLIENT:</p>
          {appObj.client_name}
        </Card.Text>
        <Card.Text style={{ textDecoration: 'underline 1.5px' }}>
          <p>EMAIL:</p>
          {appObj.client_email}
        </Card.Text>
      </Card.Body>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-1.5rem' }}>
        <div className="text-center">
          <Link href={`/appointment/${appObj.firebaseKey}`} passHref>
            <Button variant="" className="m-2" style={{ backgroundColor: ' rgb(103, 94, 82, 0.1)', fontFamily: 'Mont-ExtraLightDEMO', fontSize: '17px' }}>
              VIEW
            </Button>
          </Link>
        </div>
        <div>
          {appObj.uid === user.uid && (
            <Link href={`/appointment/edit/${appObj.firebaseKey}`} passHref>
              <Button variant="" style={{ backgroundColor: ' rgb(103, 94, 82, 0.1)', fontFamily: 'Mont-ExtraLightDEMO', fontSize: '17px' }}>
                EDIT
              </Button>
            </Link>
          )}
          {appObj.uid === user.uid && (
            <Button variant="" onClick={deleteAppointments} className="m-2" style={{ backgroundColor: ' rgb(103, 94, 82, 0.1)', fontFamily: 'Mont-ExtraLightDEMO', fontSize: '17px' }}>
              DELETE
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}

AppointmentCard.propTypes = {
  appObj: PropTypes.shape({
    client_name: PropTypes.string,
    firebaseKey: PropTypes.string,
    date: PropTypes.string,
    client_address: PropTypes.string,
    client_phone: PropTypes.string,
    client_email: PropTypes.string,
    type: PropTypes.string,
    photographer: PropTypes.string,
    photographer_id: PropTypes.string,
    client_id: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default AppointmentCard;
