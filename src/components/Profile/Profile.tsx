import React from 'react';
import './Profile.css';
import slika from './download.jpg'

const ProfilePage = () => {
  const userProfile = {
    name: 'John Doe',
    username: 'johndoe',
    email: 'johndoe@example.com',
    id: '123456',
    picture: {slika},
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed fringilla ut justo sed scelerisque.',
    location: 'New York, USA',
    interests: ['Theatre', 'Movies', 'Music'],
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img src={slika} alt="Profile" className="profile-picture" />
        <div className="profile-details">
          <h2>{userProfile.name}</h2>
          <p>@{userProfile.username}</p>
          <div className="profile-info">
            <div>
              <p>Email: {userProfile.email}</p>
              <p>ID: {userProfile.id}</p>
              <p>Location: {userProfile.location}</p>
            </div>
            <div>
              <p>Interests:</p>
              <ul>
                {userProfile.interests.map((interest, index) => (
                  <li key={index}>{interest}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="bio">
            <h3>Bio:</h3>
            <p>{userProfile.bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
