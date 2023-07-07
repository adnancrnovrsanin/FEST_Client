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

  const { reviewer, getReviewer, loading, photos, getPhoto, auditionReview, getAuditionReview, showFestivalApplicationReview, getShowFestivalApplicationReview } = profileStore
  const { isLoggedIn, user } = userStore
  const divStyle = {
    backgroundColor: '#f1f1f1',
    padding: '20px',
    marginBottom: '10px',
  };


  useEffect(() => { if (id) getReviewer(id) }, [getReviewer, id])
  useEffect(() => { if (id) getPhoto(id) }, [getPhoto, id])

  if (loading) return <InitialLoader adding='reviewer' />

  if (!reviewer) return <h1>404 not found</h1>

  function handleChange(event: SyntheticEvent<Element, Event>, value: any): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img src={slika} alt="Profile" className="profile-picture" />
        <div className="profile-details">
          <h2>{reviewer.name} {reviewer.surname}</h2>
          <p>Reviewer</p>
          <div className="profile-info">
            <div>
              <p>Email: {reviewer.email}</p>
            </div>

          </div>
        </div>
        <div className='button-content'> 
        <button className="btn btn-edit"><a href="">Edit</a></button>
        </div>
      </div>
      <div>
        {
          isLoggedIn && user?.role === Role.REVIEWER && (
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
                  <h3>Reviewed Auditions</h3>
                  <table>
                    <tbody>{
                      auditionReview.length > 0 ? (
                        auditionReview.map(auditionReview => (

                          <tr key={auditionReview.reviewId}>
                            <td>{auditionReview.auditionId}</td>
                            <td>{auditionReview.Review}</td>

                          </tr>
                        ))
                      ) : (
                        <tr>  
                          <td colSpan={2}>There are no reviewed auditions</td>
                        </tr>
                      )


                    }
                    </tbody></table>
                </div>

                <div style={divStyle}>
                  <h3>Festival applications</h3>
                  <table>
                    <tbody>{
                      showFestivalApplicationReview.length > 0 ? (
                        showFestivalApplicationReview.map(showFestivalApplicationReview => (

                          <tr key={showFestivalApplicationReview.reviewerid}>
                            <td>{showFestivalApplicationReview.showfestivalapplicationid}</td>
                            <td>{showFestivalApplicationReview.acceptable}</td>

                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={2}>There are no reviewed auditions</td>
                        </tr>
                      )


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
