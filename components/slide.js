import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

// Custom PrevArrow component
const CustomPrevArrow = (props) => {
  const { currentSlide, slideCount, ...arrowProps } = props;
  return <div {...arrowProps} />;
};

// Custom NextArrow component
const CustomNextArrow = (props) => {
  const { currentSlide, slideCount, ...arrowProps } = props;
  return <div {...arrowProps} />;
};

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3, // Number of cards to show in a row
  slidesToScroll: 1,
  prevArrow: <CustomPrevArrow />,
  nextArrow: <CustomNextArrow />,
};

const MultiItemCarousel = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(true); // Track component mount state

  useEffect(() => () => setMounted(false), []);

  const handleSliderItemClick = (type) => {
    // Handle the click event, navigate to the appropriate filter photo page
    router.push({
      pathname: '/photos',
      query: { type },
    });
  };

  if (!mounted) {
    return null; // Return null when the component is unmounted
  }

  return (
    <div className="my-component-slider" style={{ backgroundColor: 'transparent' }}>
      <Slider {...settings}>
        {/* First item */}
        <div className="slider-item-wrapper">
          <div
            className="slider-item"
            style={{ backgroundColor: 'transparent', cursor: 'pointer' }}
            tabIndex={0}
            role="button"
            onClick={() => handleSliderItemClick('wedding')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleSliderItemClick('wedding');
              }
            }}
          >
            <img className="d-block w-100" src="/slidewedd.JPG" alt="wedding" />
            <p style={{ textAlign: 'center' }}>WEDDING</p>
          </div>
        </div>
        {/* Second item */}
        <div className="slider-item-wrapper">
          <div
            className="slider-item"
            style={{ backgroundColor: 'transparent', cursor: 'pointer' }}
            tabIndex={0}
            role="button"
            onClick={() => handleSliderItemClick('graduation')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleSliderItemClick('graduation');
              }
            }}
          >
            <img className="d-block w-100" src="/slidegrad.JPG" alt="graduation" />
            <p style={{ textAlign: 'center' }}>GRADUATION</p>
          </div>
        </div>
        {/* Third item */}
        <div className="slider-item-wrapper">
          <div
            className="slider-item"
            style={{ backgroundColor: 'transparent', cursor: 'pointer' }}
            tabIndex={0}
            role="button"
            onClick={() => handleSliderItemClick('lifestyle')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleSliderItemClick('lifestyle');
              }
            }}
          >
            <img className="d-block w-100" src="/slidelife.JPG" alt="lifestyle" />
            <p style={{ textAlign: 'center' }}>LIFESTYLE</p>
          </div>
        </div>
        <div className="slider-item-wrapper">
          <div
            className="slider-item"
            style={{ backgroundColor: 'transparent', cursor: 'pointer' }}
            tabIndex={0}
            role="button"
            onClick={() => handleSliderItemClick('business')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleSliderItemClick('business');
              }
            }}
          >
            <img className="d-block w-100" src="/slidebuss.JPG" alt="business" />
            <p style={{ textAlign: 'center' }}>BUSINESS</p>
          </div>
        </div>
        {/* Add more items with onClick handlers */}
      </Slider>
    </div>
  );
};

CustomPrevArrow.propTypes = {
  currentSlide: PropTypes.number.isRequired,
  slideCount: PropTypes.number.isRequired,
  // Other props you might have
};

CustomNextArrow.propTypes = {
  currentSlide: PropTypes.number.isRequired,
  slideCount: PropTypes.number.isRequired,
  // Other props you might have
};

export default MultiItemCarousel;
