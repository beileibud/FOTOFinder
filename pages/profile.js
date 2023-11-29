import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SideNavBar from '../components/SideNavBar';
import User from '../components/User';

const ProfilePage = () => (
  <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    <Container fluid style={{ flex: '1' }}>
      <Row style={{ marginTop: '50px' }}>
        <Col sm={3}>
          <SideNavBar />
        </Col>
        <Col sm={9}>
          <User />
        </Col>
      </Row>
    </Container>
  </div>
);

export default ProfilePage;
