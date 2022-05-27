import React, { useState, useLayoutEffect, useEffect } from 'react';
import DashboardFooter from '../../Components/DashboardFooter/DashboardFooter';
import { useWindowSize } from '../../customHooks';
import MainView from './MainView/MainView';
import MessagesView from './MessagesView/MessagesView';
import socketClient from 'socket.io-client';
import './DashView.css';
import MainMobileView from './MainMobileView/MainMobileView';
import AddHangout from '../../Components/Modals/AddHangout/AddHangout';
import Filter from '../../Components/Modals/Filter/Filter';
import axios from 'axios';
import MessageThread from './MessageThread/MessageThread';
import ProfileView from './ProfileView/ProfileView';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

var socket = socketClient('http://127.0.0.1:5000'); //replace server url here

const DashView = (props) => {
  const navigate = useNavigate();
  // const [user, loading, error] = useAuthState(auth);
	// console.log(user)
  // useEffect(()=>{

  // })
  //UI States
  const [displayThread, setDisplayThread] = useState(false);
  const [addHangoutModal, setAddHangoutModal] = useState(false);
  const [filterModal, setFilterModal] = useState(false);
  const [filtered, setFiltered] = useState(false);

  //Data states
  const [events, setEvents] = useState([]);
  const [hangouts, setHangouts] = useState([]);
  const [filteredDate, setFilteredDate] = useState('');
  const [filteredLocation, setFilteredLocation] = useState('');
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [joinedHangouts, setJoinedHangouts] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const [user, loading, error] = useAuthState(auth);
  const size = useWindowSize()[0];
//console.log("xxx",user?.uid)
  useEffect(() => {
    socket.on('notif', (occasionID) => {
      //once new message notification is received, fetch new data
      axios.get('events/').then((response) => {
        setEvents(response.data);
      });
      axios.get(`hangouts?uid=${user?.uid}`).then((response) => {
        setHangouts(response.data);
      });
    });
  }, [user]);

  useEffect(() => {
    axios.get('events/').then((response) => {
      setEvents(response.data);
    });
    axios.get(`hangouts?uid=${user?.uid}`).then((response) => {
      setHangouts(response.data);
    });
  }, [user]);

  useEffect(() => {
    //find what events and hangouts a user has joined and set them
    let tempEvents = [];
    let tempHangouts = [];

    events.map((event) => {
      event.members.map((member) => {
        if (member?._id.toString() === currentUser?._id) tempEvents.push(event);
      });
    });
    hangouts.map((hangout) => {
      hangout.members.map((member) => {
        if (member?._id?.toString() === currentUser?._id)
          tempHangouts.push(hangout);
      });
    });
    setJoinedEvents(tempEvents);
    setJoinedHangouts(tempHangouts);
  }, [events, hangouts]);

  //desktop view
  if (size >= 890)
    //desktop view
    return (
      <div className='dashboard-background'>
        {addHangoutModal ? (
          <AddHangout
            setHangouts={setHangouts}
            setAddHangoutModal={setAddHangoutModal}
          />
        ) : null}
        {filterModal ? (
          <Filter
            setFilterModal={setFilterModal}
            setFiltered={setFiltered}
            setFilteredDate={setFilteredDate}
            setFilteredLocation={setFilteredLocation}
          />
        ) : null}
        <div className='container dashboard-container'>
          <div className='row'>
            <div className='col-lg-8 col-md-7 dashboard-main-view'>
              <MainView
                setAddHangoutModal={setAddHangoutModal}
                setFilterModal={setFilterModal}
                events={events}
                hangouts={hangouts}
                setEvents={setEvents}
                setHangouts={setHangouts}
                filteredDate={filteredDate}
                filteredLocation={filteredLocation}
                filtered={filtered}
                setFiltered={setFiltered}
                joinedEvents={joinedEvents}
                joinedHangouts={joinedHangouts}
              />
            </div>
            <div className='col-lg-4 col-md-5 dashboard-messages-view'>
              {React.cloneElement(props.children, {
                setEvents: setEvents,
                setHangouts: setHangouts,
                events: events,
                hangouts: hangouts,
              })}
            </div>
          </div>
        </div>
      </div>
    );
  else {
    //mobile view
    return (
      <div className='dashboard-background'>
        {addHangoutModal ? (
          <AddHangout
            setHangouts={setHangouts}
            setAddHangoutModal={setAddHangoutModal}
          />
        ) : null}
        {filterModal ? (
          <Filter
            setFilterModal={setFilterModal}
            setFiltered={setFiltered}
            setFilteredDate={setFilteredDate}
            setFilteredLocation={setFilteredLocation}
          />
        ) : null}
        <div className='container dashboard-container'>
          {React.cloneElement(props.children, {
            setEvents: setEvents,
            setHangouts: setHangouts,
            events: events,
            hangouts: hangouts,
          })}
          {!displayThread ? (
            <DashboardFooter setAddHangoutModal={setAddHangoutModal} />
          ) : null}
        </div>
      </div>
    );
  }
};

export default DashView;
