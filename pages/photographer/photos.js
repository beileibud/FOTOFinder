/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { viewPhotographersDetail } from '../../api/mergeData';
import { getPhotographersPhotos } from '../../api/photoData';
import { getUserByUID } from '../../api/photographerData';
import PhotoCard from '../../components/PhotoCard';
import PhotographerCard from '../../components/PhotographerCard';
import { useAuth } from '../../utils/context/authContext';

function PhotographerPhoto() {
  const [, setSingleP] = useState({});
  const [photographer, setPhotographer] = useState(null);
  const [photographersPhoto, setPhotographersPhoto] = useState([]);
  const router = useRouter();
  const { user } = useAuth();
  const { query } = router;
  const { firebaseKey } = router.query;

  const getSinglePhotographer = () => {
    getUserByUID(user.uid).then(setPhotographer);
  };

  useEffect(() => {
    getSinglePhotographer();
  }, []);

  useEffect(() => {
    viewPhotographersDetail(firebaseKey).then(setSingleP);
  }, [firebaseKey]);

  const getAllThePhotos = () => {
    getPhotographersPhotos(firebaseKey) // Pass the user's UID to the getPhotographersPhoto function
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
          <Col sm={3} style={{ paddingRight: '10px' }}>
            <div className="sideProfileNav">{photographer && <PhotographerCard obj={photographer} onUpdate={getSinglePhotographer} />}</div>
          </Col>
          <Col sm={9}>
            <Row style={{ marginLeft: '-10px', marginRight: '-10px' }}>
              {Array.isArray(photographersPhoto)
                && photographersPhoto.map((photo) => (
                  <Col xs={6} sm={4} md={3} style={{ padding: '10px' }}>
                    <div style={{ margin: '0 5px' }}>
                      <PhotoCard key={photo.firebaseKey} photoObj={photo} onUpdate={getAllThePhotos} photographer_id={firebaseKey || ''} />
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
