import React, { useEffect } from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  useEffect(() => {
    const footerContent = document.querySelector('.footer-content');
    if (footerContent) {
      footerContent.classList.add('fade-in');
    }
  }, []);

  return (
    <footer>
      <div className="footer-content">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>
            Some information about the theater and its mission. Learn more{' '}
            <a href="/about-us">here</a>.
          </p>
        </div>
        <div className="footer-section">
          <h3>Journey</h3>
          <p>
            Details about the theater's history and milestones. Read our
            journey <a href="/journey">here</a>.
          </p>
        </div>
        <div className="footer-section">
          <h3>Calendar</h3>
          <p>
            Upcoming shows, events, and performances. Check the calendar{' '}
            <a href="/calendar">here</a>.
          </p>
        </div>
        <div className="footer-section">
          <h3>Actors</h3>
          <p>
            Information about the theater's talented actors and performers.
            Meet our actors <a href="/actors">here</a>.
          </p>
        </div>
        <div className="footer-section">
          <h3>Theaters</h3>
          <p>
            A list of theaters associated with the theater company. Explore our
            theaters <a href="/theaters">here</a>.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
