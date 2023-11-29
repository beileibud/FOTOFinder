import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SideNavBarUser from '../components/SideNavBar2';
import SideNavbar from '../components/SideNavBar';
import User from '../components/User';
import { useAuth } from '../utils/context/authContext';
import { getUserByUID } from '../api/photographerData';

function CLientUser() {
  const [photographerUser, setPhotographerUser] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    getUserByUID(user.uid).then(setPhotographerUser);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Container fluid style={{ flex: '1' }}>
        <Row style={{ marginTop: '50px' }}>
          <Col sm={3}>{photographerUser && photographerUser.checkUser ? <SideNavbar /> : <SideNavBarUser />}</Col>
          <Col sm={9}>
            <User />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default CLientUser;
