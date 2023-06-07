/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Navbar, Container, Nav } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useAuth } from '../utils/context/authContext';

export default function NavBarAuth() {
  const { user } = useAuth();

  return (
    <Navbar collapseOnSelect expand="lg" bg="white" variant="white">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>FOTOfinder</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav className="justify-content-end">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href="/">
              <Nav.Link>Home</Nav.Link>
            </Link>
            <Link passHref href="/photographers">
              <Nav.Link>photographers</Nav.Link>
            </Link>
            <Link passHref href="/appointment/new">
              <Nav.Link>book appointment</Nav.Link>
            </Link>
            <Link passHref href="/photos">
              <Nav.Link>gallery</Nav.Link>
            </Link>
            <DropdownButton id="dropdown-basic-button" title="gallery" variant="white">
              <Dropdown.Item href="#/action-1">lifestyle</Dropdown.Item>
              <Dropdown.Item href="#/action-2">business</Dropdown.Item>
              <Dropdown.Item href="#/action-3">portrait</Dropdown.Item>
            </DropdownButton>
            <Link passHref href="/profile">
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
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
              </div>
            </Link>
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
