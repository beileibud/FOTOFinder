/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Col, Container, Row } from 'react-bootstrap';
import { viewPhotographersDetail } from '../../api/mergeData';
import { getPhotographersAppointments } from '../../api/appointmentData';
import AppointmentCard from '../../components/AppointmentCard';
import PhotographerCard from '../../components/PhotographerCard';
import { getUserByUID } from '../../api/photographerData';
import { useAuth } from '../../utils/context/authContext';

export default function ViewPhotographerApp() {
  const [, setSingleP] = useState({});
  const [photographer, setPhotographer] = useState(null);
  const { user } = useAuth();
  const router = useRouter();
  const [appointments, setApps] = useState([]);
  const [count, setCount] = useState(0);
  const { firebaseKey } = router.query;

  const getSinglePhotographer = () => {
    getUserByUID(user.uid).then(setPhotographer);
  };

  useEffect(() => {
    getSinglePhotographer();
  }, []);

  useEffect(() => {
    viewPhotographersDetail(firebaseKey).then(setSingleP);
  }, [firebaseKey]);

  const viewPApp = () => {
    getPhotographersAppointments(firebaseKey).then((data) => {
      if (Array.isArray(data)) {
        setApps(data);
        setCount(data.length);
      }
    });
  };
  useEffect(() => {
    viewPApp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // TODO: make call to API layer to get the data

  return (
    <Container style={{ display: 'flex', marginTop: '50px', minHeight: '100vh' }}>
      <Row className="sideProfileNav">
        <Col sm={3}>
          {photographer && <PhotographerCard obj={photographer} onUpdate={getSinglePhotographer} />}
        </Col>
        <Col sm={9}>
          <h5 style={{ marginTop: '30px' }}>{count} Appointments</h5>
          <div className="d-flex flex-wrap" style={{ width: '100%', color: 'black', marginBottom: '50px' }}>
            {Array.isArray(appointments) && appointments.map((appointment) => <AppointmentCard key={appointment.firebaseKey} appObj={appointment} onUpdate={getPhotographersAppointments} photographer_id={firebaseKey || ''} />)}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
