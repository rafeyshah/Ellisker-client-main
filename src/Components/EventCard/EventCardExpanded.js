import React, { useState, useEffect } from 'react';
import ReactRoundedImage from 'react-rounded-image';
import ReactDOM from 'react-dom';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import moment from 'moment';

const EventCardExpanded = ({ event, setCardExpand, setEvents }) => {
  const [isEntered, setIsEntered] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const formattedDate = moment(event.date).format('DD MMMM YYYY');
  const formattedTime = moment(event.date).format('HH:mm');

  useEffect(() => {
    checkIfEntered();
  }, [event]);

  const checkIfEntered = () => {
    if (event.members.length !== 0) {
      event.members.map((member) => {
        console.log('ran');
        if (member._id.toString() === currentUser._id) setIsEntered(true);
      });
    } else {
      setIsEntered(false);
    }
  };
  const handleEnter = () => {
    const toastLoadingID = toast.loading('Entering event...');
    axios
      .post('events/join', {
        event_id: event._id,
        user_id: currentUser._id,
      })
      .then(() => {
        axios.get('events/').then((response) => {
          setEvents(response.data);
          toast.dismiss(toastLoadingID);
          toast.success('Event joined!');
          setCardExpand(false);
        });
      });
  };

  const handleExit = () => {
    const toastLoadingID = toast.loading('Exiting event...');
    axios
      .post('events/exit', {
        event_id: event._id,
        user_id: currentUser._id,
      })
      .then(() => {
        axios.get('events/').then((response) => {
          setEvents(response.data);
          toast.dismiss(toastLoadingID);
          toast.success('Event exited!');
          setCardExpand(false);
        });
      });
  };

  const memberInfo = () => {
    if (event.members.length !== 0) {
      return (
        <div className='d-flex justify-content-center'>
          {event.members.map((member, key) => {
            while (key <= 2) {
              //map only first three members
              return (
                <div className={`member-info-icon-${key}`}>
                  <ReactRoundedImage
                    image={
                      member.images.length === 0
                        ? './images/no-image.jpg'
                        : member.images[0]
                    }
                    roundedColor='none'
                    imageWidth='32'
                    imageHeight='32'
                    roundedSize='0'
                  />
                </div>
              );
            }
          })}
          {event.members.length > 3 ? (
            <>
              <div className='member-info-icon-3'>
                <ReactRoundedImage
                  image='./images/more-members.png'
                  roundedColor='none'
                  imageWidth='32'
                  imageHeight='32'
                  roundedSize='0'
                />
              </div>
              <div className='member-info-icon-text'>
                +{event.members.length - 3}
              </div>
            </>
          ) : null}
        </div>
      );
    } else {
      return <div className='member-info-no-members'>No members!</div>;
    }
  };

  return ReactDOM.createPortal(
    <div
      className='my-modal-container d-flex justify-content-center align-items-center animate__animated animate__fadeIn animate__faster'
      onClick={(e) => {
        e.stopPropagation();
        if (e.target === e.currentTarget) setCardExpand(false);
      }}
    >
      <Toaster />
      <div class='card my-card-expanded animate__animated animate__zoomIn animate__faster'>
        <img
          src={`./images/events/${event._id}.jpg`}
          class='card-img-top'
          alt='...'
        />
        <div class='card-body'>
          <h5 class='card-title my-card-title'>{event.title}</h5>
          <p class='card-text my-card-text'>
            {formattedDate} | {formattedTime}
          </p>
          <p class='card-text my-card-text'>{event.location}</p>
          <p class='card-text my-card-text'>{event.description}</p>
          <div className='row mt-2'>
            <div className='col-7'>{memberInfo()}</div>
            <div className='col-5 d-flex justify-content-end'>
              <button
                className={isEntered ? 'my-card-btn-entered' : 'my-card-btn'}
                onClick={(e) => {
                  e.stopPropagation();
                  console.log('expanded called');
                  if (!isEntered) handleEnter();
                  else handleExit();
                }}
              >
                {isEntered ? <>entrou</> : <>entrar</>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById('portal')
  );
};

export default EventCardExpanded;
