import React, { SyntheticEvent, useEffect, useState } from 'react';
import './Profile.css';
import slika from './download.jpg'
import { useParams } from 'react-router-dom';
import { useStore } from '../../stores/store';
import UserStore from '../../stores/userStore';
import { act } from 'react-dom/test-utils';
import InitialLoader from '../InitialLoader';
import { Role } from '../../common/interfaces/UserInterfaces';
import { Box, Tab, Tabs } from '@mui/material';
import { observer } from 'mobx-react-lite';

const Profile = () => {
  const { id } = useParams();
  const { profileStore, userStore } = useStore()
  const { actor, getActor, loading } = profileStore
  const { isLoggedIn, user } = userStore


  useEffect(() => { if (id) getActor(id) }, [getActor, id])

  if (loading) return <InitialLoader adding='actor' />

  if (!actor) return <h1>404 not found</h1>

  function handleChange(event: SyntheticEvent<Element, Event>, value: any): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img src={slika} alt="Profile" className="profile-picture" />
        <div className="profile-details">
          <h2>{actor.name}</h2>
          <p>@{actor.surname}</p>
          <div className="profile-info">
            <div>
              <p>Email: {actor.email}</p>
            </div>
            <div>
              {
                isLoggedIn && user?.role === Role.ACTOR && (
                  <div>
                    <Tabs
                      onChange={handleChange}
                      textColor="secondary"
                      indicatorColor="secondary"
                      aria-label="secondary tabs example"
                    >
                      <Tab value="one" label="Item One" />
                      <Tab value="two" label="Item Two" />
                      <Tab value="three" label="Item Three" />
                    </Tabs>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </div>



  );
};

export default observer(Profile);
