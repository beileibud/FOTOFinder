/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import { Container, Nav } from 'react-bootstrap';

export default function SideNavBar() {
  return (
    <div className="sidebar">
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
          <Link className="ps-relative" passHref href="/users">
            <Nav.Link className="nav-topic">Logout Account</Nav.Link>
          </Link>
        </Nav>
      </Container>
    </div>
  );
}
