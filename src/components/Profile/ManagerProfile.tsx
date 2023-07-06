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
  const { manager, getManager, loading, photos, getPhoto } = profileStore
  const { isLoggedIn, user } = userStore
  const divStyle = {
    backgroundColor: '#f1f1f1',
    padding: '20px',
    marginBottom: '10px',
  };


  useEffect(() => { if (id) getManager(id) }, [getManager, id])
  useEffect(() => { if (id) getPhoto(id) }, [getPhoto, id])
console.log(manager)
  if (loading) return <InitialLoader adding='manager' />

  if (!manager) return <h1>404 not found</h1>

  function handleChange(event: SyntheticEvent<Element, Event>, value: any): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img src={slika} alt="Profile" className="profile-picture" />
        <div className="profile-details">
          <h2>{manager.name} {manager.surname}</h2>
          <p>Actor</p>
          <div className="profile-info">
            <div>
              <p>Email: {manager.email}</p>
            </div>

          </div>
        </div>
      </div>
      <div>
        {
          isLoggedIn && user?.role === Role.THEATRE_MANAGER && (
            <div>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={divStyle}>
                  <h3>Photos</h3>
                  <table>
                    <tbody>{
                      photos.length > 0 ? (
                        photos.map(photo => (

                          <tr key={photo.id}>
                            <td>{photo.url}</td>


                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={2}> There are no photos</td>
                        </tr>
                      )


                    }
                    </tbody></table>
                </div>

                <div style={divStyle}>
                  <h3>Menaged Theatre</h3>
                  <table>
                    <tbody>{


                      <tr >
                        <p>{manager.managedTheatre.address}</p>
                        <p>{manager.managedTheatre.managerEmail}</p>
                        <p>{manager.managedTheatre.name}</p>
                        <p>{manager.managedTheatre.phoneNumber}</p>
                        <p>{manager.managedTheatre.yearOfCreation}</p>
                      </tr>
                    }
                    </tbody></table>
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
