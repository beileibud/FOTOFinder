import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

const MultiItemCarousel = () => (
  <Carousel>
    <Carousel.Item>
      <div className="row">
        {/* First item */}
        <div className="col-md-4">
          <img
            className="d-block w-100"
            src="/test.png"
            alt="First slide"
          />
        </div>
        {/* Second item */}
        <div className="col-md-4">
          <img
            className="d-block w-100"
            src="/test.png"
            alt="First slide"
          />
        </div>
        {/* Third item */}
        <div className="col-md-4">
          <img
            className="d-block w-100"
            src="/test.png"
            alt="First slide"
          />
        </div>
      </div>
    </Carousel.Item>
    {/* Add more Carousel.Item components for additional sets of items */}
  </Carousel>
);

export default MultiItemCarousel;
