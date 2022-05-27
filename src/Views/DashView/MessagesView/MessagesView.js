import React, { useState, useEffect } from 'react';
import ReactRoundedImage from 'react-rounded-image';
import { Link, useNavigate } from 'react-router-dom';
import MessageCard from '../../../Components/MessageCard/MessageCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import './MessagesView.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import { Button, Modal } from 'react-bootstrap';
import Calenderr from '../../../Components/Calender/Calender';

const MessagesView = ({
  events,
  hangouts,
  setEvents,
  setHangouts,
  setDisplayThread,
  setCurrentChatThread,
}) => {
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [joinedHangouts, setJoinedHangouts] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const [user, loading, error] = useAuthState(auth);
  const [show, setShow] = useState(false);
  const [value, onChange] = useState(new Date());

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log(user);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('events/').then((response) => {
      setEvents(response.data);
    });
    axios.get('hangouts/').then((response) => {
      setHangouts(response.data);
    });
  }, []);

  useEffect(() => {
    //find what events and hangouts a user has joined and set them
    let tempEvents = [];
    let tempHangouts = [];

    if (events && hangouts) {
      events.map((event) => {
        event.members.map((member) => {
          if (member?._id.toString() === currentUser?._id)
            tempEvents.push(event);
        });
      });
      hangouts?.map((hangout) => {
        hangout?.members?.map((member) => {
          if (member?._id?.toString() === currentUser?._id)
            tempHangouts?.push(hangout);
        });
      });
      setJoinedEvents(tempEvents);
      setJoinedHangouts(tempHangouts);
    }
  }, [events, hangouts]);
  const handleCalender = () => {
    console.log('hello');
    return (
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Modal body text goes here.</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant='secondary'>Close</Button>
          <Button variant='primary'>Save changes</Button>
        </Modal.Footer>
      </Modal.Dialog>
    );
  };
  console.log(value.toString());
  const handleValue = (x) => {
    console.log(x);
  };
  const handleMyitem=()=>{
    navigate('/myitem')
  }
  return (
    <div>
      <div
        className='d-flex justify-content-end dashboard-messages-view-header'
        // onClick={() =>
        //   navigate('/dashboard/profile', {
        //     state: {
        //       _id: JSON.parse(localStorage.getItem('currentUser'))?._id,
        //     },
        //   })
        // }
      >
        {/* <ReactRoundedImage
          image={
            currentUser?.images?.length === 0
              ? './images/no-image.jpg'
              : currentUser?.images[0]
          }
          roundedColor='none'
          imageWidth='59.57'
          imageHeight='59.57'
          roundedSize='0'
        /> */}
        <Link to='calenderView'>
         <button className='btn bg-transparent'>Calender</button>
        </Link>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Calender</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {
              <div className='d-flex justify-content-center'>
                <Calendar onChange={onChange} value={value} className='w-75' />
              </div>
            }
            <p>{value.toString()}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='primary' onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        <p className='text-center '>{<img src='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBESERAWCBEQDxYSEQ8SEhEPDxIVEhARGBQZHBgUFhYcIS4lHB4rHxYWJjgmLS8xNTU1GiQ7QDszPy40NTEBDAwMBgYGEAYGEDEdFh0xMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMf/AABEIAOEA4QMBIgACEQEDEQH/xAAaAAEBAQEBAQEAAAAAAAAAAAAABQQDAQIH/8QANBABAAIAAwUGBQEJAQAAAAAAAAECAwQRITFBUXESMmGBkbEFIqHB0YIzQ1NykqLh8PFC/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AP0kAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHPExa178xHhx9AdBhxM9P7uNPG2/0Zb4trd+0z57PQFfXmaooC2IsTpu2dHSmYvG60+c6+4Kww4We/ix5x94bonltAAAAAAAAAAAAAAAAAAABhz2N/5r+r8AZnN8MH+r8Mczz2gAAAAAAA1YOb7NYia66a7e149GUBtjP86f3f4a6YkWiJpuR2nJYvZtpO630ngCiAAAAAAAAAAAAAAADy06RMzwiZR72mZmZ4zMqmanTDv009diUAAAAAAAAAAAACtg37Vazzjb14ujNkJ+TpaWkAAAAAAAAAAAAAAHDO/s56190xSz3cnrHumgAAAAAAAAAAAA2/Dp2W6w2sPw6dt+kNwAAAAAAAAAAAAAAOGdj5Lfp90xXxqdqto5x9eCRMcwAAAAAAAAAAAAbPh3et0j3bmP4dXZaecxHp/wBbAAAAAAAAAAAAAAAfN7xWNbzpCXmZibzNNsTt8+LX8Q7tf5vswAAAAAAAAAAAPaUmZiK7Zl4Ar4OH2axEcPfi+3HJ2maR2tumsOwAAAAAAAAAAAAAAM+errTpMT9vumrF6axMTxiYR5jTeAAAAAAAAAAAD2ldZiI4zEeoKeUrpSvnPrLs8iNNkcHoAAAAAAAAAAAAAACXnKaXnx2x91QBFH3mKaXtE85nyna+AAAAAAAAAHbKU1vXw2z5OVI1mIjjMQs6cgAAAAAAAAAAAAAAAAAAY8/h7ItHDZPTgwrF6xMTFuMaJFq6TMTwnQHgAAAAAAANORw9bazur7qLjlqdmlfGNZ6y7AAAAAAAAAAAAAAAAAAAJmdrpefGIn/fRTTs/Pz9KxH1n8gzAAAAAAEQPrD71ese4LHQAAAAAAAAAAAAAAAAAAABJzFtb266emxvzGZiusV225cuqYAAAAAAAROm7gALMTrtjjtesGVzURHZxN3CeXhLdE8toPQAAAAAAAAAAAAABnxc3Wvd+afDd6sOLmLX706RyjcDdi5ute780+G71Y8TNXtvnsxyq4gAAAAAAAAAAD7w8W1e5Mx4cPR8ANlM9/Er51/DTTHpbu2jpOyUoBaEnDzF692dY5W2w2YWcrPf+Xx3wDUPInXdt6PQAAAAAYszmtNmF525dAd8fMVp4zyj7p+Lj2v352co3OcgAAAAAAAAAAAAAAAAAAAAPvDxbV7k+XCW3BzlZ2X+WfongLQl5fMTTxjl+FOlomImu6QegA+cXu26T7I4AAAAAAAAAAAAAAAAAAAAAAAAAKmT/Z18/eXgDuAD/9k=' width="50px" alt="" srcset="" onClick={handleMyitem}/> }</p>
      </div>
      <div className='row dashboard-messages-view-title'>Mensagens</div>
      <div className='dashboard-messages-list'>
        {joinedEvents.length === 0 && joinedHangouts.length === 0 ? (
          <div className='d-flex align-items-center justify-content-center'>
            <div class='spinner-border text-light chat-spinner' role='status' />
          </div>
        ) : (
          <>
            {joinedEvents.map((joinedEvent) => {
              return (
                <MessageCard
                  setDisplayThread={setDisplayThread}
                  joinedEvent={joinedEvent}
                  setCurrentChatThread={setCurrentChatThread}
                />
              );
            })}
            {joinedHangouts.map((joinedHangout) => {
              return (
                <MessageCard
                  setDisplayThread={setDisplayThread}
                  joinedHangout={joinedHangout}
                  setCurrentChatThread={setCurrentChatThread}
                />
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default MessagesView;
