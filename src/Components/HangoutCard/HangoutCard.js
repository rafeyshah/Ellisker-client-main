import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { limitText } from '../../utils';
import moment from 'moment';
import axios from 'axios';
import './HangoutCard.css';
import ReactRoundedImage from 'react-rounded-image';

const HangoutCard = ({ hangout, setHangouts }) => {
  
  const [isEntered, setIsEntered] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const formattedDate = moment(hangout.date).format('DD MMMM YYYY');
  const formattedTime = moment(hangout.date).format('HH:mm');

  useEffect(() => {
    checkIfEntered();
  }, [hangout]);

  const checkIfEntered = () => {
    if (hangout.members.length !== 0) {
      hangout.members.map((member) => {
        if (member?._id?.toString() === currentUser?._id) setIsEntered(true);
      });
    } else {
      setIsEntered(false);
    }
  };
  const handleEnter = () => {
    const toastLoadingID = toast.loading('Entering hangout...');
    axios
      .post('hangouts/join', {
        hangout_id: hangout?._id,
        user_id: currentUser?._id,
      })
      .then(() => {
        axios.get('hangouts/').then((response) => {
          setHangouts(response?.data);
          toast.dismiss(toastLoadingID);
          toast.success('Hangout joined!');
        });
      });
  };

  const handleExit = () => {
    const toastLoadingID = toast.loading('Exiting hangout...');
    axios
      .post('hangouts/exit', {
        hangout_id: hangout?._id,
        user_id: currentUser?._id,
      })
      .then(() => {
        axios.get('hangouts/').then((response) => {
          setHangouts(response?.data);
          toast.dismiss(toastLoadingID);
          toast.success('Hangout exited!');
        });
      });
  };

  const memberInfo = () => {
    if (hangout.members.length !== 0) {
      return (
        <div className='d-flex justify-content-center'>
          {hangout.members.map((member, key) => {
            while (key <= 2) {
              //map only first three members
              return (
                <div className={`member-info-icon-${key}`}>
                  <ReactRoundedImage
                    image={
                      member?.images?.length === 0
                        ? './images/no-image.jpg'
                        : 'member.images[0]'
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
          {hangout.members.length > 3 ? (
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
                +{hangout.members.length - 3}
              </div>
            </>
          ) : null}
        </div>
      );
    } else {
      return <div className='member-info-no-members'>No memberss!</div>;
    }
  };

  return (
    <div class='card my-card'>
      <Toaster />
      <div className='row d-flex justify-content-center my-card-img'>
        <ReactRoundedImage
          // image={
          //   hangout.createdBy?.images?.length === 0
          //     ? './images/no-image.jpg'
          //     : hangout.createdBy?.images[0]
          // }
          roundedColor='none'
          imageWidth='80'
          imageHeight='80'
          roundedSize='0'
        />
      </div>
      <div class='card-body'>
        <h5 class='card-title my-card-title'>{limitText(hangout.title, 16)}</h5>
        <p class='card-text my-card-text'>
          {formattedDate} | {formattedTime}
        </p>
        <p class='card-text my-card-text'>{limitText(hangout.location, 25)}</p>
        <div className='row mt-2'>
          <div className='col-7'>{memberInfo()}</div>
          <div className='col-5 d-flex justify-content-end'>
            <button
              className={isEntered ? 'my-card-btn-entered' : 'my-card-btn'}
              onClick={(e) => {
                e.stopPropagation();
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
  );
};

export default HangoutCard;
