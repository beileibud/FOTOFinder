/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import Link from 'next/link';
import { Button, Container, Nav } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useRouter } from 'next/router';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

export default function SideNavBar() {
  const { user } = useAuth();
  const [selectedType, setSelectedType] = useState('');
  const router = useRouter();
  const { firebaseKey } = router.query;

  const handleTypeSelection = (type) => {
    setSelectedType(type);
    router.push({
      pathname: '/photographerPhoto',
      query: { type },
    });
  };

  return (
    <div className="sidebar">
      <div style={{ display: 'flex' }}>
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
        <p>{user.displayName}</p>
      </div>
      <Container className="sidebar-container">
        <Nav
          className="flex-column"
          style={{
            fontFamily: 'Mont-ExtraLightDEMO',
            fontSize: '17px',
            width: '10rem',
            color: 'gray',
          }}
        >
          {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
          <Link className="ps-relative" passHref href="/appointments">
            <Nav.Link className="nav-topic" style={{ color: 'gray' }}>
              View Appointment
            </Nav.Link>
          </Link>
          <Link className="ps-relative" passHref href={`/photographer/${firebaseKey}`}>
            <Nav.Link className="nav-topic" style={{ color: 'gray' }}>
              Add photo
            </Nav.Link>
          </Link>
          <DropdownButton id="dropdown-basic-button" title={selectedType || 'Photo Galley'} variant="white">
            <Dropdown.Item onClick={() => handleTypeSelection('')}>All</Dropdown.Item>
            <Dropdown.Item onClick={() => handleTypeSelection('lifestyle')}>lifestyle</Dropdown.Item>
            <Dropdown.Item onClick={() => handleTypeSelection('business')}>business</Dropdown.Item>
            <Dropdown.Item onClick={() => handleTypeSelection('graduation')}>graduation</Dropdown.Item>
            <Dropdown.Item onClick={() => handleTypeSelection('wedding')}>wedding</Dropdown.Item>
          </DropdownButton>
          <Button type="button" className="btn btn-sm btn-light" onClick={signOut}>
            Sign Out
          </Button>
        </Nav>
      </Container>
    </div>
  );
}
