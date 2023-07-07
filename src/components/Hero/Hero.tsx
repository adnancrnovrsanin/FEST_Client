import React from 'react';
import './Hero.css'; 
import slika from './PowerPraetorianRomanlegionaryandredcloakarmorandsword.jpg'

const Hero: React.FC = () => {
  return (
    <div className="hero-container"  style={{ backgroundImage: slika}}>
      <h1>Welcome to our Theatre</h1>
      <div className="slider">
        <div className="slide">
          <h2>Story:</h2>
          <p>Spartan</p>
          <h2>Director:</h2>
          <p>Adnan Crnovršanin</p>
          <h2>Running Time:</h2>
          <p>120 minutes</p>
        </div>
        <div className="arrows">
          <span className="arrow left">
            &#8249;
          </span>
          <span className="arrow right">
            &#8250;
          </span>
        </div>
      </div>
    </div>
    
  );
};

export default Hero;
