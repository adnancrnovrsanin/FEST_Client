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
          <h3>Privacy and Policy</h3>
          <p>
            Terms and conditions <a href="/policy">here</a>.
          </p>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
