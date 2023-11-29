import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '500px',
        margin: '0 auto',
        color: 'white',
        background: 'url(/back2.png)',
      }}
    >
      <h1>Hi there, FOTOfinders!</h1>
      <p style={{ color: 'white' }}>Click the button below to login!</p>
      <Button
        className="sign-in-btn"
        type="button"
        size="lg"
        style={{
          backgroundColor: 'white',
          outlineColor: 'white',
          borderColor: 'white',
          color: 'rgb(166, 156, 143)',
        }}
        onClick={signIn}
      >
        Sign In
      </Button>
    </div>
  );
}

export default Signin;
