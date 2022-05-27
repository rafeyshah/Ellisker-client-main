import React, { useState, useEffect } from 'react';
import ReactRoundedImage from 'react-rounded-image';
import { useNavigate } from 'react-router-dom';
import socketClient from 'socket.io-client';
import './MessageCard.css';

var socket = socketClient('https://ellskerwebsite.herokuapp.com/'); //replace server url here

const MessageCard = ({
  setDisplayThread,
  joinedEvent,
  joinedHangout,
  setCurrentChatThread,
}) => {
  const navigate = useNavigate();
  const [displayNotif, setDisplayNotif] = useState(false);

  let recentMsg = '';
  let recentMsgUser = '';

  useEffect(() => {
    socket.on('notif', (occasionID) => {
      if (joinedEvent) {
        if (occasionID === joinedEvent._id) setDisplayNotif(true);
      } else {
        if (occasionID === joinedHangout._id) setDisplayNotif(true);
      }
    });
  }, []);

  if (joinedEvent) {
    if (joinedEvent.messages.length !== 0) {
      recentMsg = joinedEvent.messages.at(-1).content;
      recentMsgUser = joinedEvent.messages.at(-1).sender.name;
    }
    return (
      <div
        className='row message-card-holder'
        onClick={() => {
          //   setDisplayThread(true);
          navigate('/dashboard/messages', { state: joinedEvent });
          // setCurrentChatThread(joinedEvent);
        }}
      >
        <div className='d-flex justify-content-start'>
          <div className='message-card-type-icon'>
            <img src='./images/event-chat-icon.png' />
          </div>
          <div className='message-card-icon'>
            {displayNotif ? (
              <img
                className='message-card-notification'
                src='./images/notification-icon.png'
              />
            ) : null}
            <ReactRoundedImage
              image={`./images/events/${joinedEvent._id}.jpg`}
              roundedColor='none'
              imageWidth='54'
              imageHeight='54'
              roundedSize='0'
            />
          </div>
          <div className='message-card-content'>
            <div className='message-card-title'>{joinedEvent.title}</div>
            <div className='message-card-text'>
              {joinedEvent.messages.length === 0 ? (
                <>Start a conversation now.</>
              ) : (
                <>
                  {recentMsgUser}: {recentMsg}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    if (joinedHangout.messages.length !== 0) {
      recentMsg = joinedHangout.messages.at(-1).content;
      recentMsgUser = joinedHangout.messages.at(-1).sender.name;
    }
    return (
      <div
        className='row message-card-holder'
        onClick={() => {
          //   setDisplayThread(true);
          navigate('/dashboard/messages', { state: joinedHangout });

          //   setCurrentChatThread(joinedHangout);
        }}
      >
        <div className='d-flex justify-content-start'>
          <div className='message-card-type-icon'>
            <img src='./images/hangout-chat-icon.png' />
          </div>
          <div className='message-card-icon'>
            {displayNotif ? (
              <img
                className='message-card-notification'
                src='./images/notification-icon.png'
              />
            ) : null}
            <ReactRoundedImage
              image={
                joinedHangout?.createdBy?.images?.length === 0
                  ? './images/no-image.jpg'
                  : joinedHangout?.createdBy?.images
              }
              roundedColor='none'
              imageWidth='54'
              imageHeight='54'
              roundedSize='0'
            />
          </div>
          <div className='message-card-content'>
            <div className='message-card-title'>{joinedHangout.title}</div>
            <div className='message-card-text'>
              {joinedHangout.messages.length === 0 ? (
                <>Start a conversation now.</>
              ) : (
                <>
                  {recentMsgUser}: {recentMsg}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default MessageCard;
