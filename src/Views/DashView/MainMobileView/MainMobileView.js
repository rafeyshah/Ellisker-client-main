import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useWindowSize } from '../../../customHooks';
import ReactRoundedImage from 'react-rounded-image';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './MainMobileView.css';
import axios from 'axios';
import EventCard from '../../../Components/EventCard/EventCard';
import HangoutCard from '../../../Components/HangoutCard/HangoutCard';
import HangoutCardExpanded from '../../../Components/HangoutCard/HangoutCardExpanded';
import EventCardExpanded from '../../../Components/EventCard/EventCardExpanded';
import { useNavigate } from 'react-router-dom';

const MainMobileView = () => {
  const navigate = useNavigate();
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

    events.map((event) => {
      event.members.map((member) => {
        if (member._id.toString() === currentUser._id) tempEvents.push(event);
      });
    });
    hangouts.map((hangout) => {
      hangout.members.map((member) => {
        if (member._id.toString() === currentUser._id)
          tempHangouts.push(hangout);
      });
    });
    setJoinedEvents(tempEvents);
    setJoinedHangouts(tempHangouts);
  }, [events, hangouts]);

  const [cardExpand, setCardExpand] = useState(false);
  const [cardExpandData, setCardExpandData] = useState({});
  const [searchValue, setSearchValue] = useState('');

  const RenderEvent = (event) => {
    return (
      <div
        className='d-flex justify-content-center col-md-4 col-sm-6'
        onClick={() => {
          setCardExpand(true);
          setCardExpandData(event);
        }}
      >
        <EventCard event={event} setEvents={setEvents} />
        {cardExpand && cardExpandData._id === event._id ? (
          <EventCardExpanded
            event={cardExpandData}
            setCardExpand={setCardExpand}
            setEvents={setEvents}
          />
        ) : null}
      </div>
    );
  };

  const RenderHangout = (hangout) => {
    return (
      <div
        className='d-flex justify-content-center col-md-4 col-sm-6'
        onClick={() => {
          setCardExpand(true);
          setCardExpandData(hangout);
        }}
      >
        <HangoutCard hangout={hangout} setHangouts={setHangouts} />
        {cardExpand && cardExpandData._id === hangout._id ? (
          <HangoutCardExpanded
            hangout={cardExpandData}
            setCardExpand={setCardExpand}
            setHangouts={setHangouts}
          />
        ) : null}
      </div>
    );
  };

  const filterCheck = (occasion) => {
    if (
      moment(occasion.date).format('LL') === //filter date
        moment(filteredDate).format('LL') ||
      moment(occasion.date).format('HH:mm') === //filter time
        moment(filteredDate).format('HH:mm') ||
      occasion.location === filteredLocation
    )
      return true;
    return false;
  };

  const searchAndFilter = (items, type) => {
    if (searchValue && !filtered) {
      //true if only search is performed
      return items.map((item) => {
        if (item.title.toLowerCase().includes(searchValue.toLowerCase())) {
          //check whether passed argument	are events or hangout and render them relatively
          if (type === 'events') return RenderEvent(item);
          else return RenderHangout(item);
        }
      });
    }
    if (filtered && !searchValue) {
      //true if only filter is performed
      return items.map((item) => {
        if (filterCheck(item)) {
          if (type === 'events') return RenderEvent(item);
          else return RenderHangout(item);
        }
      });
    }
    if (searchValue && filtered) {
      return items.map((item) => {
        //search the filtered items
        if (filterCheck(item)) {
          if (item.title.toLowerCase().includes(searchValue.toLowerCase())) {
            if (type === 'events') return RenderEvent(item);
            else return RenderHangout(item);
          }
        }
      });
    } else {
      //if nothing is performed, return all items
      return items.map((item) => {
        if (type === 'events') return RenderEvent(item);
        else return RenderHangout(item);
      });
    }
  };

  return (
    <div>
      <div className='row dashboard-main-view-header'>
        <div className='col-11 d-flex justify-content-start'>
          <div className='row dashboard-main-view-header-search-wrap-mobile'>
            <div className='col-10'>
              <input
                className='dashboard-main-view-header-search-mobile'
                placeholder='Procurar eventos e hangouts'
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
            <div className='col-2'>
              <img
                className='form-control-icon-mobile'
                src='./images/search-icon.png'
              />
            </div>
          </div>
        </div>
        <div
          className='col-1 d-flex justify-content-end mt-1'
          onClick={() =>
            navigate('/dashboard/profile', {
              state: {
                _id: JSON.parse(localStorage.getItem('currentUser'))._id,
              },
            })
          }
        >
          <ReactRoundedImage
            image={
              currentUser.images.length === 0
                ? './images/no-image.jpg'
                : currentUser.images[0]
            }
            roundedColor='none'
            imageWidth='40'
            imageHeight='40'
            roundedSize='0'
          />
        </div>
      </div>
      <Tabs>
        <TabList className='row ps-3 dashboard-main-view-tab-list-mobile'>
          <Tab
            className='col-3 dashboard-main-view-tab-title-mobile'
            selectedClassName='dashboard-main-view-tab-title-mobile-selected'
          >
            &nbsp;&nbsp;todos&nbsp;&nbsp;
          </Tab>
          <Tab
            className='col-4 dashboard-main-view-tab-title-mobile'
            selectedClassName='dashboard-main-view-tab-title-mobile-selected'
          >
            &nbsp;&nbsp;eventos&nbsp;&nbsp;
          </Tab>
          <Tab
            className='col-4 dashboard-main-view-tab-title-mobile'
            selectedClassName='dashboard-main-view-tab-title-mobile-selected'
          >
            &nbsp;&nbsp;hangout&nbsp;&nbsp;
          </Tab>
          <div className='col-1 d-flex justify-content-end'>
            <img
              className={
                filtered
                  ? 'dashboard-main-view-no-filter-icon-mobile'
                  : 'dashboard-main-view-filter-icon-mobile'
              }
              src={
                filtered
                  ? './images/no-filter-icon.png'
                  : './images/filter-icon.png'
              }
              onClick={() => {
                if (filtered) setFiltered(false);
                else setFilterModal(true);
              }}
            />
          </div>
        </TabList>
        <TabPanel>
          <div className='cards-holder animate__animated animate__fadeIn animate__faster'>
            <div className='row'>
              {searchAndFilter(events, 'events')}
              {searchAndFilter(hangouts, 'hangouts')}
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <div className='cards-holder'>
            <div className='row'>{searchAndFilter(events, 'events')}</div>
          </div>
        </TabPanel>
        <TabPanel>
          <div className='cards-holder'>
            <div className='row'>{searchAndFilter(hangouts, 'hangouts')}</div>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default MainMobileView;
