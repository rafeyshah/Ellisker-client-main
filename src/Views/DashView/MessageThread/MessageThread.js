import React, { useEffect, useState, useRef } from 'react';
import ReactRoundedImage from 'react-rounded-image';
import toast from 'react-hot-toast';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import socketClient from 'socket.io-client';
import './MessageThread.css';
import axios from 'axios';

var socket = socketClient('https://ellskerwebsite.herokuapp.com/'); //replace server url here

const MessageThread = ({ setEvents, setHangouts }) => {
  const { state } = useLocation(); //state is the event/hangout that was clicked on
  const navigate = useNavigate();
  const [inputMessage, setInputMessage] = useState('');
  const [threadMessages, setThreadMessages] = useState([]);
  const [threadHasMessages, setThreadHasMessages] = useState(true);
  const formattedDate = moment(state.date).format('DD MMMM YYYY');
  const formattedTime = moment(state.date).format('HH:mm');
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const occasionID = state._id;
  const chatMessages = document.querySelector(
    '.dashboard-message-thread-view-messages-holder'
  );
  let occasionType;
  if (state.createdBy) occasionType = 'hangout';
  else occasionType = 'event';

  useEffect(() => {
    if (chatMessages) chatMessages.scrollTop = chatMessages.scrollHeight; //scroll to bottom on start
  });

  useEffect(() => {
    if (occasionType === 'event') {
      axios
        .post('events/get-messages', { event_id: occasionID })
        .then((response) => {
          setThreadMessages(response.data);
          if (response.data.length === 0) setThreadHasMessages(false);
        });
    } else {
      axios
        .post('hangouts/get-messages', { hangout_id: occasionID })
        .then((response) => {
          setThreadMessages(response.data);
          if (response.data.length === 0) setThreadHasMessages(false);
        });
    }
  }, []);

  useEffect(() => {
    const prevRoom = JSON.parse(localStorage.getItem('currentRoom'));
    if (prevRoom)
      //leave previoiusly joined room
      socket.emit('leaveRoom', {
        _id: currentUser._id,
        room: prevRoom,
      });
    socket.emit('joinRoom', {
      //join selected room
      _id: currentUser._id,
      room: occasionID,
    });
    localStorage.setItem('currentRoom', JSON.stringify(occasionID));
    socket.on('message', (messageObj) => {
      setThreadMessages((prevThread) => [...prevThread, messageObj]);
      if (chatMessages) chatMessages.scrollTop = chatMessages.scrollHeight; //scroll to bottom
    });
  }, []);

  const handleExit = () => {
    if (occasionType === 'event') {
      const toastLoadingID = toast.loading('Exiting event...');
      axios
        .post('events/exit', {
          event_id: occasionID,
          user_id: currentUser._id,
        })
        .then(() => {
          axios.get('events/').then((response) => {
            setEvents(response.data);
            toast.dismiss(toastLoadingID);
            toast.success('Event exited!');
            navigate(-1);
          });
        });
    } else {
      const toastLoadingID = toast.loading('Exiting hangout...');
      axios
        .post('hangouts/exit', {
          hangout_id: occasionID,
          user_id: currentUser._id,
        })
        .then(() => {
          axios.get('hangouts/').then((response) => {
            setHangouts(response.data);
            toast.dismiss(toastLoadingID);
            toast.success('Hangout exited!');
            navigate(-1);
          });
        });
    }
  };

  const messageSubmit = (message) => {
    socket.emit('chatMessage', {
      room: occasionID,
      roomType: occasionType,
      _id: currentUser._id,
      name: currentUser.name,
      message: message,
      image:
        currentUser.images.length === 0
          ? './images/no-image.jpg'
          : currentUser.images[0],
      time: new Date(),
    }); //Emitting message to server
    if (occasionType === 'event') {
      //save event message to database
      axios
        .post('events/add-message', {
          event_id: occasionID,
          user_id: currentUser._id,
          message: message,
        })
        .then(() => {
          socket.emit('sendNotif', occasionID);
        });
    } else {
      //save hangout message to database
      axios
        .post('hangouts/add-message', {
          hangout_id: occasionID,
          user_id: currentUser._id,
          message: message,
        })
        .then(() => {
          socket.emit('sendNotif', occasionID);
        });
    }
  };

  const displayCurrentUserMessage = (message, time) => {
    time = moment(time).format('HH:mm');
    return (
      <div className='d-flex align-items-end justify-content-end dashboard-message-thread-view-message-holder'>
        <div className='dashboard-message-thread-view-message-time-current'>
          {time}
        </div>
        <div className='dashboard-message-thread-view-message-content-holder-current'>
          <div className='dashboard-message-thread-view-message-content'>
            {message}
          </div>
        </div>
        <div className='dashboard-message-thread-view-message-icon'>
          <ReactRoundedImage
            image={
              currentUser.images.length === 0
                ? './images/no-image.jpg'
                : currentUser.images[0]
            }
            roundedColor='none'
            imageWidth='45'
            imageHeight='45'
            roundedSize='0'
          />
        </div>
      </div>
    );
  };

  const displayOtherUserMessage = (message, name, time, image) => {
    time = moment(time).format('HH:mm');
    return (
      <div className='d-flex align-items-end justify-content-start dashboard-message-thread-view-message-holder ms-0'>
        <div className='dashboard-message-thread-view-message-icon'>
          <ReactRoundedImage
            image={image}
            roundedColor='none'
            imageWidth='45'
            imageHeight='45'
            roundedSize='0'
          />
        </div>
        <div className='dashboard-message-thread-view-message-content-holder-other'>
          <div>
            <div className='dashboard-message-thread-view-message-other-name'>
              {name}:
            </div>
            <div className='dashboard-message-thread-view-message-content'>
              {message}
            </div>
          </div>
        </div>
        <div className='dashboard-message-thread-view-message-time-other'>
          {time}
        </div>
      </div>
    );
  };

  const displayMessagesThread = () => {
    if (threadMessages.length !== 0) {
      return threadMessages.map((threadMessage) => {
        if (
          threadMessage.sender._id ===
          JSON.parse(localStorage.getItem('currentUser'))._id
        )
          return displayCurrentUserMessage(
            threadMessage.content,
            threadMessage.createdTime
          );
        else
          return displayOtherUserMessage(
            threadMessage.content,
            threadMessage.sender.name,
            threadMessage.createdTime,
            threadMessage.sender.images.length === 0
              ? './images/no-image.jpg'
              : threadMessage.sender.images[0]
          );
      });
    } else if (threadHasMessages && threadMessages.length === 0) {
      return (
        <div className='d-flex align-items-center justify-content-center'>
          <div class='spinner-border text-light chat-spinner' role='status' />
        </div>
      );
    } else if (!threadHasMessages && threadMessages.length === 0) {
      return (
        <div className='d-flex align-items-center justify-content-center chat-start-msg'>
          Start a conversation!
        </div>
      );
    }
  };

  return (
    <div>
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
          onClick={() => navigate('/dashboard')}
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
        <div className='col-6 ms-1'>
          <div className='dashboard-message-thread-view-title-name'>
            {state.title}
          </div>
          <div className='dashboard-message-thread-view-title-date'>
            {formattedDate} | {formattedTime}
          </div>
        </div>
        <div className='col-1 dashboard-message-thread-view-title-exit-icon'>
          <img src='./images/exit-group-icon.png' onClick={handleExit} />
        </div>
        <div className='col-1 dashboard-message-thread-view-title-details-icon'>
          <img
            src='./images/details-icon.png'
            onClick={() =>
              navigate('/dashboard/messages/details', { state: state })
            }
          />
        </div>
      </div>
      <div className='dashboard-message-thread-view-messages-holder'>
        {displayMessagesThread()}
      </div>
      <div className='row g-0 dashboard-message-thread-view-input-holder'>
        <div className='col-11'>
          <input
            className='dashboard-message-thread-view-input'
            placeholder='Enter message'
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyUp={(e) => {
              if (e.code === 'Enter') {
                messageSubmit(inputMessage);
                setInputMessage('');
              }
            }}
          />
        </div>
        <div className='col-1 dashboard-message-thread-view-input-icon'>
          <img
            src='./images/arrow-icon.png'
            onClick={() => {
              messageSubmit(inputMessage);
              setInputMessage('');
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MessageThread;
