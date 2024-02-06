/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { viewPhotographersDetail } from '../../api/mergeData';
import { getPhotographersPhotos } from '../../api/photoData';
import { getSinglePhotographer } from '../../api/photographerData';
import PhotoCard from '../../components/PhotoCard';
import PhotographerCard from '../../components/PhotographerCard';

function PhotographerPhoto() {
  const [, setSingleP] = useState({});
  const [photographer, setPhotographer] = useState(null);
  const [photographersPhoto, setPhotographersPhoto] = useState([]);
  const router = useRouter();
  const { query } = router;
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSinglePhotographer(firebaseKey) // Fetch the single photographer using the firebaseKey
      .then((photographerData) => {
        setPhotographer(photographerData);
      })
      .catch((error) => {
        console.log('Error fetching photographer:', error);
      });
  }, [firebaseKey]);

  useEffect(() => {
    viewPhotographersDetail(firebaseKey).then(setSingleP);
  }, [firebaseKey]);

  const getAllThePhotos = () => {
    getPhotographersPhotos(firebaseKey)
      .then((data) => {
        // Ensure data is not undefined here
        if (Array.isArray(data)) {
          const filterPhotos = query.type ? data.filter((photo) => photo.type === query.type) : data;
          setPhotographersPhoto(filterPhotos);
        } else {
          setPhotographersPhoto([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching photos:', error);
      });

  };

  useEffect(() => {
    getAllThePhotos();
  }, [query.type]);

  console.log('getAllThePhotos function:', getAllThePhotos);

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Container fluid style={{ flex: '1' }}>
        <Row style={{ marginTop: '50px' }}>
          <Col sm={3} style={{ paddingRight: '10px' }}>
            <div className="sideProfileNav">
              {photographer && <PhotographerCard obj={photographer} />}
            </div>
          </Col>
          <Col sm={9}>
            <Row style={{ marginLeft: '-10px', marginRight: '-10px' }}>
              {Array.isArray(photographersPhoto) && photographersPhoto.map((photo) => (
                <Col key={photo.firebaseKey} xs={6} sm={4} md={3} style={{ padding: '10px' }}>
                  <div style={{ margin: '0 5px' }}>
                    <PhotoCard photoObj={photo} onUpdate={getAllThePhotos} photographer_id={firebaseKey || ''} />
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
