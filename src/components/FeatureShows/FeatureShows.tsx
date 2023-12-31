import React from 'react';
import './FeatureShows.css';
import slika1 from './ra.jpg'

const FeaturedShows: React.FC = () => {
  const featuredShows = [
    {
      title: 'Labudovo Jezero',
      image: slika1,
      date: 'June 30, 2023',
      location: 'Theater A',
    },
    {
      title: 'Cica Gorio',
      image: slika1,
      date: 'May 15, 2023',
      location: 'Theater B',
    },
    // Add more show objects as needed
  ];

  return (
    <section className="featured-shows">
      <div className="container">
        <h2>Past Shows</h2>
        <div className="show-list">
          {featuredShows.map((show, index) => (
            <div className="show-card" key={index}>
              <img src={slika1} alt={show.title} />
              <div className="show-details">
                <h3>{show.title}</h3>
                <p>Date: {show.date}</p>
                <p>Location: {show.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedShows;
