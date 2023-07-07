import React from 'react';

interface Developer {
  name: string;
  position: string;
  bio: string;
  image: string;
}

interface Props {
  developer: Developer;
}

const DeveloperCard: React.FC<Props> = ({ developer }) => {
  return (
    <div className="developer-card">
      <img src={developer.image} alt={developer.name} className="developer-image" />
      <div className="developer-details">
        <h2>{developer.name}</h2>
        <p>{developer.position}</p>
        <p>{developer.bio}</p>
      </div>
    </div>
  );
};

export default DeveloperCard;
