import React from 'react';
import './FeatureShows.css';

const FeaturedShows: React.FC = () => {
  const featuredShows = [
    {
      title: 'Show Title 1',
      image: 'path/to/show1.jpg',
      date: 'June 30, 2023',
      location: 'Theater A',
    },
    {
      title: 'Show Title 2',
      image: 'path/to/show2.jpg',
      date: 'July 15, 2023',
      location: 'Theater B',
    },
    // Add more show objects as needed
  ];

  return (
    <section className="featured-shows">
      <div className="container">
        <h2>Featured Shows</h2>
        <div className="show-list">
          {featuredShows.map((show, index) => (
            <div className="show-card" key={index}>
              <img src={show.image} alt={show.title} />
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
