/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PhotoCard from '../components/PhotoCard';
import SideNavBar from '../components/SideNavBar';
import { getPhotographersPhotos } from '../api/photoData'; // Assuming you have this function imported
import { useAuth } from '../utils/context/authContext';

function PhotographerPhoto() {
  const [photographersPhoto, setPhotographersPhoto] = useState([]);
  const router = useRouter();
  const { query } = router;
  const { user } = useAuth(); // Extract the user object from the useAuth hook

  const getAllThePhotos = () => {
    getPhotographersPhotos(user.uid) // Pass the user's UID to the getPhotographersPhoto function
      .then((data) => {
        if (Array.isArray(data)) {
          const filterPhotos = query.type ? data.filter((photo) => photo.type === query.type) : data;
          setPhotographersPhoto(filterPhotos);
        } else {
          setPhotographersPhoto([]);
        }
      });
  };

  useEffect(() => {
    getAllThePhotos();
  }, [query.type]);

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Container fluid style={{ flex: '1' }}>
        <Row style={{ marginTop: '50px' }}>
          <Col sm={2} style={{ paddingRight: '10px' }}>
            <SideNavBar />
          </Col>
          <Col sm={10}>
            <Row style={{ marginLeft: '-10px', marginRight: '-10px' }}>
              {photographersPhoto.map((photo) => (
                <Col xs={6} sm={4} md={3} key={photo.uid} style={{ padding: '10px' }}>
                  <div style={{ margin: '0 5px' }}>
                    <PhotoCard photoObj={photo} onUpdate={getAllThePhotos} />
                  </div>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default PhotographerPhoto;
