import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { getPhotographers } from '../api/photographerData';
import PhotographerCard from '../components/PhotographerCard';

function Photographers() {
  const [photographers, setPhotographers] = useState([]);
  const [filteredPhotographers, setFilteredPhotographers] = useState([]);
  const [searchZipCode, setSearchZipCode] = useState('');

  const getAllThePhotographers = () => {
    getPhotographers(searchZipCode).then((data) => {
      setPhotographers(data);
      setFilteredPhotographers(data);
    });
  };

  const handleSearch = () => {
    const filtered = photographers.filter((photographer) => photographer.zipcode === searchZipCode);
    setFilteredPhotographers(filtered);
  };

  useEffect(() => {
    getAllThePhotographers();
  }, [searchZipCode]);

  return (
    <Container
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        marginTop: '3rem',
      }}
    >
      <div className="search-bar-container">
        <h2 className="title">Photographers</h2>
        <div className="search-bar">
          <input type="text" className="search-input" placeholder="Search by Zip Code" style={{ fontSize: '17px' }} value={searchZipCode} onChange={(e) => setSearchZipCode(e.target.value)} />
          <button type="button" className="search-btn" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      <Row>
        {filteredPhotographers.map((photo) => (
          <Col
            key={photo.firebaseKey}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            // Adjust the flexBasis and margin properties
          >
            <PhotographerCard obj={photo} onUpdate={getAllThePhotographers} onlyImageAndName />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Photographers;
