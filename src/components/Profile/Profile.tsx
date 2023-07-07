import { useEffect } from 'react';
import './Profile.css';
import slika from './download.jpg'
import { useNavigate, useParams } from 'react-router-dom';
import { useStore } from '../../stores/store';
import InitialLoader from '../InitialLoader';
import { Role } from '../../common/interfaces/UserInterfaces';
import { observer } from 'mobx-react-lite';


const Profile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { profileStore, userStore } = useStore()
  const { actor, getActor,
    loading, actingroles, getActingRoles,
    auditionsnotreviewed, getAuditionsNotReviewed,
    auditionsreviewed, getAuditionsReviewed,
    photos,getPhoto
  } = profileStore
  const { isLoggedIn, user } = userStore
  const divStyle = {
    backgroundColor: '#f1f1f1',
    padding: '20px',
    marginBottom: '10px',
  };


  useEffect(() => { if (id) getActor(id) }, [getActor, id]) 
  useEffect(() => { if (id) getActingRoles(id) }, [getActingRoles, id])
  useEffect(() => { if (id) getAuditionsReviewed(id) }, [getAuditionsReviewed, id])
  useEffect(() => { if (id) getAuditionsNotReviewed(id) }, [getAuditionsNotReviewed, id])
  useEffect(() => { if (id) getPhoto(id) }, [getPhoto, id])



  if (loading) return <InitialLoader adding='actor' />

  if (!actor) return <h1>404 not found</h1>


  return (
    <div className="profile-container">
      <div className="profile-card">
        <img src={slika} alt="Profile" className="profile-picture" />
        <div className='content1'>
        <div className="profile-details">
          <h2>{actor.name} {actor.surname}</h2>
          <p>Actor</p>
          <div className="profile-info">
            <div>
              <p>Email: {actor.email}</p>
            </div>
          </div>
        </div>
        <div className='button-content'> 
        <button className="btn btn-edit" onClick={() => navigate(`/profile/editactor/${id}`)}>
          Edit
        </button>
        </div>
        </div>
        
      </div>
      <div>
        {
          isLoggedIn && user?.role === Role.ACTOR && (
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
                      auditionsreviewed.length > 0 ? (
                        auditionsreviewed.map(reviewed => (

                          <tr key={reviewed.actorId}>
                            <td>{reviewed.description}</td>
                            <td>{reviewed.email}</td>
                            <td>{reviewed.name}</td>
                            <td>{reviewed.roleName}</td>
                            <td>{reviewed.showName}</td>
                            <td>{reviewed.surname}</td>

                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={2}> There are no reviewed auditions</td>
                        </tr>
                      )


                    }
                    </tbody></table>
                </div>
                <div style={divStyle}>
                  <h3>Unreviewed Auditions</h3>
                  <table>
                    <tbody>{
                      auditionsnotreviewed.length > 0 ? (
                        auditionsnotreviewed.map(reviewed => (

                          <tr key={reviewed.auditionId  }>
                            <p>{reviewed.averageReview}</p>
                            <p>{reviewed.description}</p>
                            <p>{reviewed.email}</p>
                            <td>{reviewed.name}</td>
                            <td>{reviewed.roleName}</td>
                            <td>{reviewed.showName}</td>
                            <td>{reviewed.surname}</td>

                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={2}>There are no unreviewed auditions</td>
                        </tr>
                      )


                    }
                    </tbody></table>
                </div>

                <div style={divStyle}>
                  <h3>Roles</h3>
                  <table>
                    <tbody>{
                      actingroles.length > 0 ? (
                        actingroles.map(role => (

                          <tr key={role.id}>
                            <td>{role.showRoleName}</td>
                            <td>{role.pay}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={3}> There are no acting roles</td>
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
