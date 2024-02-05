import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/router';
import { Container, Row, Col } from 'react-bootstrap';
import PhotographerCard from '../../components/PhotographerCard';
import { getSinglePhotographer } from '../../api/photographerData';

const PProfilePage = () => {
  const [photographer, setSingleP] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  const viewSinglePhotographer = () => {
    getSinglePhotographer(firebaseKey)
      .then((photographerData) => {
        console.log('Fetched photographer:', photographerData);
        if (photographerData !== null) {
          setSingleP(photographerData);
        }
      })
      .catch((error) => {
        console.log('Error fetching photographer:', error);
      });
  };

  useEffect(() => {
    viewSinglePhotographer();
  }, [firebaseKey]);

  console.log('Photographer:', photographer);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Container fluid style={{ flex: '1' }}>
        <Row style={{ position: 'relative', marginTop: '50px' }}>
          <Col sm={3} style={{ marginTop: '50px' }}>
            {Object.keys(photographer).length > 0 && (
              <PhotographerCard obj={photographer} onUpdate={viewSinglePhotographer} />
            )}
          </Col>
          <Col sm={9} className="photographer-profile-fbkey" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <br />
            {photographer && (
              <>
                <PhotographerCard obj={photographer} onUpdate={viewSinglePhotographer} onlyImageAndName />
                <PhotographerCard obj={photographer} onUpdate={viewSinglePhotographer} onlyAboutMe />
              </>
            )}
            <Link passHref href="/appointment/new">
              <Button variant="light" type="button" className="photographer-appoint-btn" style={{ color: 'white', backgroundColor: 'rgb(103, 94, 82)', marginTop: '100px' }}>
                BOOK NOW
              </Button>
            </Link>
            <h2 style={{
              fontFamily: 'Mont-ExtraLightDEMO',
              fontSize: '20px',
              marginTop: '10px',
              marginBottom: '100px',
            }}
            >
              Lets book an Appointment with this Photographer today!
            </h2>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PProfilePage;
