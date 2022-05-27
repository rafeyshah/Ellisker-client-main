import React, { useEffect, useState } from 'react';
import { AgeFromDate } from 'age-calculator';
import './ProfileView.css';
import ReactRoundedImage from 'react-rounded-image';
import ImageSlider from './ImageSlider';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProfileView = () => {
  const [user, setUser] = useState();
  const { state } = useLocation();
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  useEffect(() => {
    axios.post('users/get-user', { user_id: state?._id }).then((response) => {
      setUser(response?.data[0]);
    });
  }, []);

  const getAge = () => {
    return new AgeFromDate(new Date(user.dob))?._age;
  };

  const renderHeader = () => {
    if (state?._id === currentUser?._id) {
      //the current user views their own profile
      return (
        <div className='d-flex dashboard-profile-header'>
          <img
            className='profile-header-icon-back'
            src='./images/back-icon.png'
            onClick={() => navigate(-1)}
          />
          <span className='profile-header-text'>Meu Perfil</span>
          <img
            className='profile-header-icon'
            src='./images/edit-icon.png'
            onClick={() => {
              navigate('/dashboard/profile-edit', {
                state: { _id: state?._id },
              });
            }}
          />
        </div>
      );
    } else {
      //the current user views someone else's profile
      return (
        <div className='row dashboard-message-thread-view-title g-0'>
          <div
            className='col-1 dashboard-message-thread-view-title-back-icon'
            onClick={() => navigate(-1)}
          >
            <img src='./images/back-icon.png' />
          </div>
          <div className='col-2 dashboard-message-thread-view-title-occasion-icon me-2'>
            <ReactRoundedImage
              image={
                state.createdBy
                  ? state?.createdBy?.images.length === 0
                    ? './images/no-image.jpg'
                    : state.createdBy.images[0] //hangout image
                  : `./images/events/${state?.event_id}.jpg` //event image
              }
              imageWidth='45'
              imageHeight='45'
              roundedSize='0'
            />
          </div>
          <div className='col-7 ms-2'>
            <div className='dashboard-message-thread-view-title-name'>
              {state.title}
            </div>
            <div className='dashboard-message-thread-view-title-date'>
              {state.formattedDate} | {state?.formattedTime}
            </div>
          </div>
          <div className='col-1 dashboard-message-thread-view-title-details-icon'>
            <img
              src='./images/details-icon.png'
              onClick={() =>
                navigate('/dashboard/messages/details', {
                  state: state?.detailsState,
                })
              }
            />
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      <div className='row d-flex justify-content-end dashboard-message-thread-view-header'>
        <ReactRoundedImage
          image={
            currentUser?.images.length === 0
              ? './images/no-image.jpg'
              : currentUser?.images[0]
          }
          roundedColor='none'
          imageWidth='59.57'
          imageHeight='59.57'
          roundedSize='0'
        />
      </div>
      {renderHeader()}
      <div className='dashboard-profile-view-content'>
        {user ? (
          <>
            <div className='image-slider-holder d-flex justify-content-center'>
              <ImageSlider userImages={user?.images} />
            </div>
            <div className='profile-view-name-age'>
              {user.name} , {getAge()}
            </div>
            <div className='profile-view-location'>{user?.location}</div>
            <div className='profile-view-decription'>{user?.description}</div>
          </>
        ) : (
          <div className='d-flex align-items-center justify-content-center'>
            <div class='spinner-border text-light chat-spinner' role='status' />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileView;
