import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import { useAuth } from '../utils/context/authContext';
import { getUserByUID } from '../api/photographerData';

function TopSlide() {
  const [index, setIndex] = useState(0);
  const [photographerUser, setPhotographerUser] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    getUserByUID(user.uid).then(setPhotographerUser);
  }, []);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} className="carousel">
      <Carousel.Item>
        <img className="d-block w-100" src="/back2.png" alt="First slide" />
        <Carousel.Caption>
          {photographerUser && photographerUser.checkUser ? (
            <Link passHref href="/photographerProfile">
              <Button className="app-top-button" style={{ color: 'white' }} variant="light">
                Profile Page
              </Button>
            </Link>
          ) : (
            <Link passHref href="/photographer/new">
              <Button className="app-top-button" style={{ color: 'white' }} variant="light">
                Become a Photographer
              </Button>
            </Link>
          )}
          <p className="randen-text" style={{ color: 'white', fontSize: '40px' }}>
            Create a professional photography website for your portfolio. Start your journey today.{' '}
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src="/back3.png" alt="Second slide" />
        <Carousel.Caption>
          <Link passHref href="/appointment/new">
            <Button className="app-top-button" variant="light">
              Book Appointment
            </Button>
          </Link>
          <p className="randen-text" style={{ color: 'rgb(166, 156, 143)', fontSize: '40px' }}>
            Easy to book an appointment with the photographer s who are close to you.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default TopSlide;
