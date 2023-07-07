import React from 'react';
import './JourneyPage.css';

const JourneyPage: React.FC = () => {
  const journeyData = [
    {
      title: 'Theatre Establishment',
      description: 'The theatre was established in 1960 and has been entertaining audiences ever since. It started as a small community theatre and gradually grew into a renowned cultural institution.',
    },
    {
      title: 'Expansion and Renovation',
      description: 'In 1990, the theatre underwent a major expansion and renovation project to accommodate larger audiences and provide state-of-the-art facilities. The upgraded theatre became a landmark in the city.',
    },
    {
      title: 'Celebrating Milestones',
      description: 'Over the years, the theatre has celebrated numerous milestones and achievements. It has hosted prestigious productions, received awards for its exceptional performances, and collaborated with renowned artists from around the world.',
    },
    {
      title: 'Festival Participation',
      description: 'The theatre actively participates in various festivals and cultural events. It has been a prominent contributor to the local arts scene, showcasing diverse performances and promoting cultural exchange.',
    },
    {
      title: 'Community Engagement',
      description: 'The theatre strongly believes in community engagement and has initiated outreach programs to involve local residents in theatre activities. It conducts workshops, educational programs, and community events to foster artistic growth.',
    },
  ];

  return (
    <div className="journey-container">
      <h1>Our Journey</h1>
      <p>Discover the remarkable milestones of our theatre, from its establishment to its engagement with the community and participation in festivals.</p>
      <div className="journey-data">
        {journeyData.map((data, index) => (
          <div key={index} className="journey-item">
            <h2>{data.title}</h2>
            <p>{data.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JourneyPage;
