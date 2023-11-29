import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Container } from 'react-bootstrap';
import { viewAppointmentDetails } from '../../api/mergeData';

export default function ViewAppointment() {
  const router = useRouter();
  const [appDetails, setAppDetails] = useState({});

  // TODO: grab firebaseKey from url
  const { firebaseKey } = router.query;

  // TODO: make call to API layer to get the data
  useEffect(() => {
    viewAppointmentDetails(firebaseKey).then(setAppDetails);
  }, [firebaseKey]);

  return (
    <Container className="view-appointment" style={{ marginBottom: '100px' }}>
      <h1 className="appointment-title">Appointment Details</h1>
      <div className="appointment-info">
        <h3 className="info-item">Date: {appDetails.date}</h3>
        <h3 className="info-item">Client: {appDetails.client_name}</h3>
        <h3 className="info-item">Photographer: {appDetails.photographerObject?.name}</h3>
        <h3 className="info-item">Type: {appDetails.type}</h3>
        <h3 className="info-item">Client Phone: {appDetails.client_phone}</h3>
        <h3 className="info-item">Client Adress: {appDetails.client_address}</h3>
      </div>
    </Container>
  );
}
