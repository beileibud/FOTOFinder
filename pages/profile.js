import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SideNavBar from '../components/SideNavBar';
import User from '../components/User';
import { useAuth } from '../utils/context/authContext';

const ProfilePage = () => {
  const { user } = useAuth();

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
          <User />
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
