import React, { useState } from 'react';
import './Hero.css'; 
import slika from './PowerPraetorianRomanlegionaryandredcloakarmorandsword.jpg'

interface Slide {
  id: number;
  story: string;
  director: string;
  runningTime: string;
}

const Hero: React.FC = () => {
  const slides: Slide[] = [
    {
      id: 1,
      story: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      director: 'John Doe',
      runningTime: '2 hours 30 minutes',
    },
    {
      id: 2,
      story: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem.',
      director: 'Jane Smith',
      runningTime: '2 hours 15 minutes',
    },
    // Add more slides as needed
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
  };

  return (
    <div className="hero-container"  style={{ backgroundImage: slika}}>
      <h1>Welcome to our Theatre</h1>
      <div className="slider">
        <div className="slide">
          <h2>Story:</h2>
          <p>Prica</p>
          <h2>Director:</h2>
          <p>Samir Babo</p>
          <h2>Running Time:</h2>
          <p>100 sati</p>
        </div>
        <div className="arrows">
          <span className="arrow left" onClick={handlePrevSlide}>
            &#8249;
          </span>
          <span className="arrow right" onClick={handleNextSlide}>
            &#8250;
          </span>
        </div>
      </div>
      <button className="hero-button">Get Tickets</button>
    </div>
  );
};

export default Hero;
