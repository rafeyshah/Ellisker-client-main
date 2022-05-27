import React from 'react';
import ReactRoundedImage from 'react-rounded-image';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import './DetailsView.css';

const DetailsView = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const formattedDate = moment(state.date).format('DD MMMM YYYY');
  const formattedTime = moment(state.date).format('HH:mm');
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const headerData = {
    createdBy: state.createdBy ? state.createdBy : null,
    event_id: state._id,
    title: state.title,
    formattedDate: formattedDate,
    formattedTime: formattedTime,
    detailsState: state,
  };
  return (
    <>
      <div className='row d-flex justify-content-end dashboard-message-thread-view-header'>
        <ReactRoundedImage
          image={
            currentUser.images.length === 0
              ? './images/no-image.jpg'
              : currentUser.images[0]
          }
          roundedColor='none'
          imageWidth='59.57'
          imageHeight='59.57'
          roundedSize='0'
        />
      </div>
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
                ? state.createdBy.images.length === 0
                  ? './images/no-image.jpg'
                  : state.createdBy.images[0] //hangout image
                : `./images/events/${state._id}.jpg` //event image
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
            {formattedDate} | {formattedTime}
          </div>
        </div>
        <div className='col-1 dashboard-message-thread-view-title-details-icon'>
          <img
            src='./images/details-icon.png'
            onClick={() => {
              navigate('/dashboard/messages/details', { state: state });
            }}
          />
        </div>
      </div>
      <div className='group-details'>
        <div className='group-details-description'>{state.description}</div>
        <div className='group-details-participants-title'>
          Participantes {`(${state.members.length})`}
        </div>
        <div className='group-details-participants-holder'>
          {state.members.map((member) => {
            return (
              <div
                className='row g-0 align-items-center group-details-participant'
                onClick={() => {
                  headerData._id = member._id;
                  navigate('/dashboard/profile', { state: headerData });
                }}
              >
                <ReactRoundedImage
                  image={
                    member.images.length === 0
                      ? './images/no-image.jpg'
                      : member.images[0]
                  }
                  roundedColor='none'
                  imageWidth='50'
                  imageHeight='50'
                  roundedSize='0'
                />
                &nbsp;&nbsp;&nbsp;{member.name}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default DetailsView;
