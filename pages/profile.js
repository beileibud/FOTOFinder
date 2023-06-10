import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SideNavBar from '../components/SideNavBar';
import User from '../components/User';

const ProfilePage = () => (
  <Container fluid>
    <Row style={{ marginTop: '50px' }}>
      <Col sm={3}>
        <SideNavBar />
      </Col>
      <Col sm={9}>
        <User />
      </Col>
    </Row>
  </Container>
);

export default ProfilePage;
