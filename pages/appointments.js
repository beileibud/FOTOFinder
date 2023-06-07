import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SideNavBar from '../components/SideNavBar';
import { useAuth } from '../utils/context/authContext';
import AppointmentCard from '../components/AppointmentCard';
import { getAppointments } from '../api/appointmentData';

const AppointmentsPage = () => {
  const { user } = useAuth();
  const [appointments, setAppointment] = useState([]);
  const [count, setCount] = useState(0);

  const getAllAppointments = () => {
    getAppointments()
      .then((data) => {
        if (Array.isArray(data)) {
          setAppointment(data);
          setCount(data.length); // here is updating the count
        } else {
          console.error('Invalid response from API: expected an array');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getAllAppointments();
  }, []);

  return (
    <Container fluid>
      <Row style={{ marginTop: '50px' }}>
        <Col sm={3}>
          <div style={{ display: 'flex' }}>
            <img
              src={user.photoURL}
              alt={user.displayName}
              style={{
                height: '30px',
                width: '30px',
                borderRadius: '50%',
                marginRight: '10px',
              }}
            />
            <p>{user.displayName}</p>
          </div>
          <SideNavBar />
        </Col>
        <Col sm={9}>
          <h5 style={{ marginTop: '30px' }}>{count} Appointments</h5>
          <div className="d-flex flex-wrap" style={{ width: '100%', color: 'black', marginBottom: '50px' }}>
            {/* check if questions is an array before mapping */}
            {Array.isArray(appointments) && appointments.map((appointment) => <AppointmentCard key={appointment.firebaseKey} appObj={appointment} onUpdate={getAllAppointments} />)}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AppointmentsPage;
