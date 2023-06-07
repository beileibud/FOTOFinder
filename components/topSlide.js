import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';

function TopSlide() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img className="d-block w-100" src="/backslide.png" alt="First slide" />
        <Carousel.Caption>
          <Link passHref href="/photographer/new">
            <Button className="app-button" variant="light">
              Become a Photographer
            </Button>
          </Link>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src="/backslide2.png" alt="Second slide" />

        <Carousel.Caption>
          <Link passHref href="/appointment/new">
            <Button className="app-button" variant="light">
              Book Appointment
            </Button>
          </Link>
          <p style={{ color: 'white' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default TopSlide;
