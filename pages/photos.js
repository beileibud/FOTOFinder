/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { getPhotos } from '../api/photoData';
import PhotoCard from '../components/PhotoCard';

function Photos() {
  const [photos, setPhotos] = useState([]);
  const router = useRouter();
  const { query } = router;

  const getAllThePhotos = () => {
    getPhotos().then((data) => {
      const filterPhotos = query.type ? data.filter((photo) => photo.type === query.type) : data;
      setPhotos(filterPhotos);
    });
  };

  useEffect(() => {
    getAllThePhotos();
  }, [query.type]);

  const handleCardClick = (type) => {
    router.push({
      pathname: '/nested-photos',
      query: { type },
    });
  };

  return (
    <Container
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        marginTop: '3rem',
      }}
    >
      <h2>Photos</h2>
      <Row>
        {photos.map((photo) => (
          <Col key={photo.firebaseKey} xs={12} sm={6} md={4} lg={3}>
            <PhotoCard photoObj={photo} onUpdate={getAllThePhotos} onCardClick={handleCardClick} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Photos;
