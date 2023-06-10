/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import { Button, Container, Nav } from 'react-bootstrap';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

export default function SideNavBar() {
  const { user } = useAuth();

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
        <Nav className="flex-column">
          {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
          <Link className="ps-relative" passHref href="/appointments">
            <Nav.Link className="nav-topic">View Appointment</Nav.Link>
          </Link>
          <Link className="ps-relative" passHref href="/photographer/new">
            <Nav.Link className="nav-topic">About me</Nav.Link>
          </Link>
          <Link className="ps-relative" passHref href="/">
            <Nav.Link className="nav-topic">Schedules</Nav.Link>
          </Link>
          <Link className="ps-relative" passHref href="/photo/new">
            <Nav.Link className="nav-topic">Portfolio</Nav.Link>
          </Link>
          <Button type="button" className="btn btn-sm btn-light" onClick={signOut}>
            Sign Out
          </Button>
        </Nav>
      </Container>
    </div>
  );
}
