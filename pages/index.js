import React from 'react';
import MultiItemCarousel from '../components/slide';
import TopSlide from '../components/topSlide';

function Home() {
  return (
    <div>
      <TopSlide />
      <br />
      <h2 className="text-center">Find the photo type you want</h2>
      <br />
      <MultiItemCarousel />
    </div>
  );
}

export default Home;
