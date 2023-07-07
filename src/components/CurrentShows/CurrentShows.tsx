import React from 'react';
import './CurrentShows.css';
import slika from './download.jpg'
import slika1 from './ra.jpg'


const CurrentShows: React.FC = () => {
  const currentShows = [
    {
      title: 'Hamlet',
      image: slika,
      date: 'July 30, 2023',
      location: 'Novi Pazar',
    },
    {
      title: 'Romeo i Julia',
      image: slika,
      date: 'July 15, 2023',
      location: 'Theater B',
    },
    // Add more show objects as needed
  ];

  return (
    <section className="current-shows">
      <div className="container">
        <h2>Incoming shows</h2>
        <div className="show-list">
          {currentShows.map((show, index) => (
            <div className="show-card" key={index}>
              <img src={slika} alt={show.title} />
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

export default CurrentShows;
