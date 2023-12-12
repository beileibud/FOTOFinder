import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SideNavBar from '../components/SideNavBar';
import AppointmentCard from '../components/AppointmentCard';
import { getClientsAppointment, getPhotographersAppointments } from '../api/appointmentData';
import { useAuth } from '../utils/context/authContext';
import SideNavBarUser from '../components/SideNavBar2';
import { getUserByUID } from '../api/photographerData';

const AppointmentsPage = () => {
  const [appointments, setAppointment] = useState([]);
  const [photographerUser, setPhotographerUser] = useState(null);
  const [count, setCount] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    getUserByUID(user.uid).then(setPhotographerUser);
  }, []);

  const getAllAppointments = () => {
    if (user.checkUser) {
      getPhotographersAppointments(user.uid)
        .then((data) => {
          if (Array.isArray(data)) {
            setAppointment(data);
            setCount(data.length);
          } else {
            console.error('Invalid response from API: expected an array');
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      getClientsAppointment(user.uid)
        .then((data) => {
          if (Array.isArray(data)) {
            setAppointment(data);
            setCount(data.length);
          } else {
            console.error('Invalid response from API: expected an array');
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  useEffect(() => {
    getAllAppointments();
  }, []);

  return (
    <Container fluid style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Row style={{ marginTop: '50px' }}>
        <Col sm={3}>{photographerUser && photographerUser.checkUser ? <SideNavBar /> : <SideNavBarUser />}</Col>
        <Col sm={9}>
          <h5 style={{ marginTop: '30px' }}>{count} APPOINTMENTS</h5>
          <div className="d-flex flex-wrap" style={{ width: '100%', color: 'black', marginBottom: '50px' }}>
            {Array.isArray(appointments) && appointments.map((appointment) => <AppointmentCard key={appointment.firebaseKey} appObj={appointment} onUpdate={getAllAppointments} photographer_id={appointment.photographer_id} />)}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AppointmentsPage;
