import Link from 'next/link';
import React from 'react';
import { Button } from 'react-bootstrap';
import { signOut } from '../utils/auth';
import MultiItemCarousel from '../components/slide';
import TopSlide from '../components/topSlide';

function Home() {
  return (
    <div>
      <TopSlide />
      <br />
      <h2 className="text-center" style={{ marginTop: '50px', fontFamily: 'Calliga-Regular', fontSize: '60px' }}>Find the photo type you want</h2>
      <br style={{ marginTop: '50px' }} />
      <MultiItemCarousel />
      <h1 style={{ marginTop: '100px', fontFamily: 'Calliga-Regular', fontSize: '60px' }}>Create your photography website</h1>
      <h5>Create a professional photography website for your portfolio. Start your free journey today.  No credit card required. Create better websites with mobile-responsive templates, seamless drag & drop and unlimited customization.</h5>
      <br />
      <br />
      <br />
      <br />
      <div className="image-stack">
        <div className="home-go-text">
          <h1 className="home-go-text__text">Take a look of all the photographers.</h1>
          <Link passHref href="/photographers">
            <Button className="home-go-btn" variant="light" style={{ marginLeft: '0.8rem' }}>LET S GO</Button>
          </Link>
        </div>
        <div className="image-stack__item image-stack__item--bottom">
          <img src="/home2.jpg" alt="" />
        </div>
        <div className="image-stack__item image-stack__item--top">
          <img src="/home3.png" alt="" />
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <h5>All you need to do is turn up.
        Your Snappr photographer will bring their professional-grade equipment to your location at your chosen time, and you can relax in the hands of an experienced creative.
      </h5>
      <br />
      <br />
      <div className="text-center">
        <Button variant="light" type="button" className="home-out-btn m-3" style={{ backgroundColor: ' rgb(103, 94, 82, 0.1)', justifyItems: 'center', justifyContent: 'space-between' }} onClick={signOut}>
          Sign Out
        </Button>
      </div>
      <br />
      <br />
    </div>
  );
}

export default Home;
