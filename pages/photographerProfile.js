import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { getUserByUID } from '../api/photographerData';
import PhotographerCard from '../components/PhotographerCard';
import { useAuth } from '../utils/context/authContext';

const PPProfilePage = () => {
  const [photographer, setPhotographer] = useState(null);
  const { user } = useAuth();

  const getSinglePhotographer = () => {
    getUserByUID(user.uid).then(setPhotographer);
  };

  useEffect(() => {
    getSinglePhotographer();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Container fluid style={{ flex: '1' }}>
        <Row style={{ marginTop: '50px' }}>
          <Col sm={3} style={{ marginTop: '50px' }}>
            {photographer && <PhotographerCard obj={photographer} onUpdate={getSinglePhotographer} />}
          </Col>
          <Col
            sm={9}
            className="photographer-profile-fbkey"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: '30px',
            }}
          >
            {photographer && <PhotographerCard obj={photographer} onUpdate={getSinglePhotographer} onlyImageAndName />}
            {photographer && <PhotographerCard obj={photographer} onUpdate={getSinglePhotographer} onlyAboutMe />}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PPProfilePage;
