import React, { useEffect, useState } from 'react';
import './ProfileEditView.css';
import ReactRoundedImage from 'react-rounded-image';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ImageViewer from './ImageViewer';
import toast from 'react-hot-toast';

const ProfileEditView = () => {
  const [user, setUser] = useState();
  const { state } = useLocation();
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const [updatedName, setUpdatedName] = useState('');
  const [updatedDOB, setUpdatedDOB] = useState('');
  const [updatedLocation, setUpdatedLocation] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');

  const handleNameUpdate = () => {
    if (updatedName !== user.name) {
      axios
        .post('users/update-name', {
          user_id: currentUser._id,
          name: updatedName,
        })
        .then((response) => {
          if (response.status === 200) toast.success('Name updated!');
          else toast.error('Failed to update name!');
        });
    }
  };

  const handleDOBUpdate = () => {
    if (updatedDOB !== user.dob) {
      console.log(updatedDOB);
      axios
        .post('users/update-dob', {
          user_id: currentUser._id,
          dob: updatedDOB,
        })
        .then((response) => {
          if (response.status === 200) toast.success('Birthday updated!');
          else toast.error('Failed to update name!');
        });
    }
  };

  const handleLocationUpdate = () => {
    if (updatedLocation !== user.location) {
      axios
        .post('users/update-location', {
          user_id: currentUser._id,
          location: updatedLocation,
        })
        .then((response) => {
          if (response.status === 200) toast.success('Location updated!');
          else toast.error('Failed to update name!');
        });
    }
  };

  const handleDescriptionUpdate = () => {
    if (updatedDescription !== user.description) {
      axios
        .post('users/update-description', {
          user_id: currentUser._id,
          description: updatedDescription,
        })
        .then((response) => {
          if (response.status === 200) toast.success('Description updated!');
          else toast.error('Failed to update name!');
        });
    }
  };

  useEffect(() => {
    axios.post('users/get-user', { user_id: state._id }).then((response) => {
      const userData = response.data[0];
      setUser(userData);
      setUpdatedName(userData.name);
      setUpdatedDOB(userData.dob ? new Date(userData.dob) : '');
      setUpdatedLocation(userData.location ? userData.location : '');
      setUpdatedDescription(userData.description ? userData.description : '');
    });
  }, []);

  return (
    <div>
      <div className='row d-flex justify-content-end dashboard-message-thread-view-header'>
        <ReactRoundedImage
          image={currentUser.images[0]}
          roundedColor='none'
          imageWidth='59.57'
          imageHeight='59.57'
          roundedSize='0'
        />
      </div>
      <div className='d-flex dashboard-profile-header'>
        <img
          className='profile-header-icon-back'
          src='./images/back-icon.png'
          onClick={() => navigate(-1)}
        />
        <span className='profile-header-text'>Meu Perfil</span>
      </div>
      <div className='dashboard-profile-view-content'>
        {user ? (
          <>
            <div>
              <ImageViewer setUser={setUser} userImages={user.images} />
            </div>
            <div className='profile-edit-view-input-label'>Name</div>
            <input
              className='profile-edit-view-input'
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
              onBlur={handleNameUpdate}
            />
            <div className='profile-edit-view-input-label'>Nascimento</div>
            <DatePicker
              selected={updatedDOB}
              onChange={(date) => setUpdatedDOB(date)}
              customInput={<input className='profile-edit-view-input' />}
              dateFormat='dd/MM/yy'
              onKeyDown={(e) => {
                e.preventDefault();
              }}
              onCalendarClose={handleDOBUpdate}
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode='select'
            />
            <div className='profile-edit-view-input-label'>Localização</div>
            <input
              className='profile-edit-view-input'
              value={updatedLocation}
              onChange={(e) => setUpdatedLocation(e.target.value)}
              onBlur={handleLocationUpdate}
            />
            <div className='profile-edit-view-input-label'>Descrição</div>
            <textarea
              className='profile-edit-view-input'
              style={{ minHeight: '130px' }}
              value={updatedDescription}
              onChange={(e) => setUpdatedDescription(e.target.value)}
              onBlur={handleDescriptionUpdate}
            />
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

export default ProfileEditView;
