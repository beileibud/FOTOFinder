/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Navbar, Container, Nav } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';

export default function NavBarAuth() {
  const { user } = useAuth();
  const [selectedType, setSelectedType] = useState('');
  const router = useRouter();

  const handleTypeSelection = (type) => {
    setSelectedType(type);
    router.push({
      pathname: '/photos',
      query: { type },
    });
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="white" variant="white">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>FOTOfinder</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav className="justify-content-end">
            <Link passHref href="/">
              <Nav.Link>Home</Nav.Link>
            </Link>
            <Link passHref href="/photographers">
              <Nav.Link>photographers</Nav.Link>
            </Link>
            <Link passHref href="/appointment/new">
              <Nav.Link>book appointment</Nav.Link>
            </Link>
            <Link passHref href={{ pathname: '/photos', query: { type: selectedType } }}>
              <Nav.Link>
                <DropdownButton id="dropdown-basic-button" title={selectedType || 'Type'} variant="white">
                  <Dropdown.Item onClick={() => handleTypeSelection('')}>All Types</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleTypeSelection('lifestyle')}>lifestyle</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleTypeSelection('business')}>business</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleTypeSelection('graduation')}>graduation</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleTypeSelection('wedding')}>wedding</Dropdown.Item>
                </DropdownButton>
              </Nav.Link>
            </Link>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Link passHref href="/profile">
                <a>
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    style={{
                      height: '30px',
                      width: '30px',
                      borderRadius: '50%',
                      marginRight: '10px',
                    }}
                  />
                </a>
              </Link>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

NavBarAuth.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string,
    photoURL: PropTypes.string,
  }).isRequired,
};
