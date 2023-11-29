import React from 'react';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';

const Footer = () => {
  const { user } = useAuth();

  return (
    <footer style={{ backgroundColor: '#f8f4f0', padding: '10px' }}>
      <div className="footer-nav" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="logo-line" /> {/* Gray line */}
        <p className="logo-name">FOTOfinder</p>
        <Link className="footer-text" passHref href="/">
          HOME
        </Link>
        <Link className="footer-text" passHref href="/photographers">
          PHOTOGRAPHERS
        </Link>
        <Link className="nav-rest-buttons" passHref href="/appointment/new">
          BOOK APPOINTMENT
        </Link>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginLeft: '20px' }}>
          <img
            src={user.photoURL}
            alt={user.displayName}
            style={{
              height: '30px',
              width: '30px',
              borderRadius: '50%',
              marginRight: '100px',
            }}
          />
          {/* Other footer content */}
        </div>
        <p style={{ marginLeft: '10px' }}>&copy; {new Date().getFullYear()} FOTOFinder. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
