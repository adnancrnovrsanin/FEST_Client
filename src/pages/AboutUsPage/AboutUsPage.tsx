import React from 'react';
import './AboutUsPage.css';
import  DeveloperCard from '../../components/Footer/DeveloperCard';
 './DeveloperCard';
 import slika from './55555989.jpg'
 import slika2 from './99744080.png'


const AboutUsPage: React.FC = () => {
  const developers = [
    {
      name: 'Samir Talović',
      position: 'Frontend & Backend Developer',
      bio: 'I am Samir Talović, a passionate and driven Software Engineering student, constantly seeking new challenges and opportunities to expand my skills and make a positive impact through technology',
      image: slika2
    },
    {
      name: 'Adnan Crnovršanin',
      position: 'Frontend & Backend Developer',
      bio: 'Hey, I am Alex Johnson, a versatile and creative Software Engineering student who thrives on solving complex problems and building innovative software solutions that push the boundaries of what is possible',
      image: slika
    },
  ]

  return (
    <div className="about-us-container">
      <h1>About Us</h1>
      <div className="developer-cards">
        {developers.map((developer, index) => (
          <DeveloperCard key={index} developer={developer} />
        ))}
      </div>
    </div>
  );
};

export default AboutUsPage;
