/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import { Button, Container, Nav } from 'react-bootstrap';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

export default function SideNavBarUser() {
  const { user } = useAuth();

  return (
    <div className="sidebar">
      <div style={{ display: 'flex', marginTop: '50px' }}>
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
        <Nav className="flex-column" style={{ fontFamily: 'Mont-ExtraLightDEMO', fontSize: '17px', width: '10rem' }}>
          {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
          <Link className="ps-relative" passHref href="/appointments">
            <Nav.Link className="nav-topic" style={{ color: 'gray' }}>
              View Appointment
            </Nav.Link>
          </Link>
          <Link passHref href="/appointment/new">
            <Nav.Link style={{ color: 'gray' }}>book appointment</Nav.Link>
          </Link>
          <Button type="button" className="btn btn-sm btn-light" style={{ backgroundColor: ' rgb(103, 94, 82, 0.1)' }} onClick={signOut}>
            Sign Out
          </Button>
        </Nav>
      </Container>
    </div>
  );
}
