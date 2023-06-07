/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import { deleteSingleAppointments } from '../api/appointmentData';

function AppointmentCard({ appObj, onUpdate }) {
  const { user } = useAuth();
  // FOR DELETE, WE NEED TO REMOVE THE BOOK AND HAVE THE VIEW RERENDER,
  // SO WE PASS THE FUNCTION FROM THE PARENT THAT GETS THE BOOKS
  const deleteAppointments = () => {
    if (window.confirm(`Delete ${appObj.client_name}?`)) {
      deleteSingleAppointments(appObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '100%', color: 'black' }}>
      <Card.Body>
        <Card.Text>
          <p className="card-text bold">{appObj.client_name}</p>
        </Card.Text>
        <Card.Text>{appObj.client_address}</Card.Text>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href={`/appointment/${appObj.firebaseKey}`} passHref>
            <Button variant="primary" className="m-2">VIEW</Button>
          </Link>
          <div>
            {appObj.uid === user.uid ? (
              <Link href={`/appointment/edit/${appObj.firebaseKey}`} passHref>
                <Button variant="outline-warning" style={{ height: '100%' }}>
                  EDIT
                </Button>
              </Link>
            ) : (
              ''
            )}
            {appObj.uid === user.uid ? (
              <Button variant="outline-secondary" onClick={deleteAppointments} className="m-2" style={{ height: '100%' }}>
                DELETE
              </Button>
            ) : (
              ''
            )}
          </div>
          <footer>123</footer>
        </div>
      </Card.Body>
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
    photographer_uid: PropTypes.string,
    client_id: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default AppointmentCard;
