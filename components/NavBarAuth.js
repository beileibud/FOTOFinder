import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar, Container, Nav } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import { getUserByUID } from '../api/photographerData';

export default function NavBarAuth() {
  const { user } = useAuth();
  const [photographerUser, setPhotographerUser] = useState(null);
  const [selectedType, setSelectedType] = useState('');
  const router = useRouter();

  useEffect(() => {
    getUserByUID(user.uid).then(setPhotographerUser);
  }, []);

  const handleTypeSelection = (type) => {
    setSelectedType(type);
    router.push({
      pathname: '/photos',
      query: { type },
    });
  };

  if (!user) {
    return null;
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="white" variant="white">
      <Container className="nav-container" style={{ display: 'flex', flexDirection: 'column' }}>
        <Link passHref href="/">
          <Navbar.Brand className="logo-name">FOTOfinder</Navbar.Brand>
        </Link>
        <div className="nav-rest-buttons">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse className="nav-text">
            <Nav className="nav-text">
              <Link passHref href="/">
                <Nav.Link>HOME</Nav.Link>
              </Link>
              <Link passHref href="/photographers">
                <Nav.Link>PHOTOGRAPHERS</Nav.Link>
              </Link>
              <Link passHref href="/appointment/new">
                <Nav.Link>BOOK APPOINTMENT</Nav.Link>
              </Link>
              <DropdownButton id="dropdown-basic-button" title={selectedType || 'PHOTOS'} variant="white" style={{ alignItem: 'center' }}>
                <Dropdown.Item className="dropdown-basic" onClick={() => handleTypeSelection('')}>
                  All
                </Dropdown.Item>
                <Dropdown.Item className="dropdown-basic" onClick={() => handleTypeSelection('lifestyle')}>
                  lifestyle
                </Dropdown.Item>
                <Dropdown.Item className="dropdown-basic" onClick={() => handleTypeSelection('business')}>
                  business
                </Dropdown.Item>
                <Dropdown.Item className="dropdown-basic" onClick={() => handleTypeSelection('graduation')}>
                  graduation
                </Dropdown.Item>
                <Dropdown.Item className="dropdown-basic" onClick={() => handleTypeSelection('wedding')}>
                  wedding
                </Dropdown.Item>
              </DropdownButton>
              <div className="nav-rest-buttons">
                {photographerUser && photographerUser.checkUser ? (
                  <Link passHref href="/photographerProfile">
                    <Nav.Link className="nav-text">PROFILE PAGE</Nav.Link>
                  </Link>
                ) : (
                  <Link passHref href="/clientUser">
                    <Nav.Link>PROFILE PAGE</Nav.Link>
                  </Link>
                )}
              </div>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
  );
}
