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
  const { actor, getActor, loading, actingroles, getActingRoles } = profileStore
  const { isLoggedIn, user } = userStore
  const divStyle = {
    backgroundColor: '#f1f1f1',
    padding: '20px',
    marginBottom: '10px',
  };


  useEffect(() => { if (id) getActor(id) }, [getActor, id])
  useEffect(() => { if (id) getActingRoles(id) }, [getActingRoles, id])


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
          <h2>{actor.name} {actor.surname}</h2>
          <p>Actor</p>
          <div className="profile-info">
            <div>
              <p>Email: {actor.email}</p>
            </div>

          </div>
        </div>
      </div>
      <div>
        {
          isLoggedIn && user?.role === Role.ACTOR && (
            <div>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={divStyle}>
                  <h3>Pictures</h3>
                  <p>This is the content of Div 1.</p>
                </div>

                <div style={divStyle}>
                  <h3>Auditions</h3>
                  <p>This is the content of Div 2.</p>
                </div>

                <div style={divStyle}>
                  <h3>Roles</h3>
                  <p>{
                    actingroles.length > 0 ? (
                      actingroles.map(role => (
                        <tr key={role.actor.id}>
                          <td>{role.showRoleName}</td>
                          <td>{role.pay}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                      <td colSpan={3}> There are no acting roles</td>
                      </tr>
                    )


                  }</p>

                </div>
              </div>

            </div>
          )
        }
      </div>
    </div>



  );
};

export default observer(Profile);
