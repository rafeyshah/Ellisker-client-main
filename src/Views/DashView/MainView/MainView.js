import React, { useEffect, useState } from 'react';
import { Audio } from 'react-loader-spinner';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './MainView.css';
import EventCard from '../../../Components/EventCard/EventCard';
import HangoutCard from '../../../Components/HangoutCard/HangoutCard';
import EventCardExpanded from '../../../Components/EventCard/EventCardExpanded';
import HangoutCardExpanded from '../../../Components/HangoutCard/HangoutCardExpanded';
import moment from 'moment';
import { signOut } from 'firebase/auth';
import auth from '../../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MainView = ({
  setAddHangoutModal,
  setFilterModal,
  events,
  setEvents,
  setHangouts,
  hangouts,
  filteredDate,
  filteredLocation,
  filtered,
  setFiltered,
  joinedEvents,
  joinedHangouts,
}) => {
  const [cardExpand, setCardExpand] = useState(false);
  const [cardExpandData, setCardExpandData] = useState({});
  const [searchValue, setSearchValue] = useState('');
  const [user, loading, error] = useAuthState(auth);
  console.log(user);
  const logout = () => {
    signOut(auth);
  };

  const RenderEvent = (event) => {
    return (
      <div
        className='d-flex justify-content-center col-lg-4 col-md-6'
        onClick={() => {
          setCardExpand(true);
          setCardExpandData(event);
        }}>
        <EventCard event={event} setEvents={setEvents} />
        {cardExpand && cardExpandData?._id === event?._id ? (
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
        className='d-flex justify-content-center col-lg-4 col-md-6'
        onClick={() => {
          setCardExpand(true);
          setCardExpandData(hangout);
        }}>
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
      return items?.map((item) => {
        if (type === 'events') return RenderEvent(item);
        else return RenderHangout(item);
      });
    }
  };

  return (
    <div>
      <div className='row dashboard-main-view-header'>
        <div className='col-4 dashboard-main-view-header-logo-wrapper'>
          <img
            className='dashboard-main-view-header-logo'
            src='./images/Logo.png'
          />
        </div>
        <div className='col-md-8 d-flex justify-content-end'>
          <div className='row dashboard-main-view-header-search-wrap'>
            <div className='col-10'>
              <input
                class='dashboard-main-view-header-search'
                placeholder='Procurar eventos e hangouts'
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>

            <div className='col-2'>
              <img
                className='form-control-icon'
                src='./images/search-icon.png'
              />
            </div>
          </div>
          <div className='d-flex justify-content-end'>
            {' '}
            <div className='ms-4'>
              {user ? (
                <button type='button' onClick={logout} className='btn bg-transparent'>
                  signout
                </button>
              ) : (
                <Nav.Link as={Link} to='/login'>
                  <button type='button' className='btn bg-transparent'>
                    Login
                  </button>
                </Nav.Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <Tabs>
        <TabList className='row dashboard-main-view-tab-list'>
          <Tab
            className='d-flex justify-content-center col-2 dashboard-main-view-tab-title'
            selectedClassName='dashboard-main-view-tab-title-selected'>
            &nbsp;&nbsp;todos&nbsp;&nbsp;
          </Tab>
          <Tab
            className='d-flex justify-content-center col-2 dashboard-main-view-tab-title'
            selectedClassName='dashboard-main-view-tab-title-selected'>
            &nbsp;&nbsp;eventos&nbsp;&nbsp;
          </Tab>
          <Tab
            className='d-flex justify-content-center col-2 dashboard-main-view-tab-title'
            selectedClassName='dashboard-main-view-tab-title-selected'>
            &nbsp;&nbsp;hangout&nbsp;&nbsp;
          </Tab>
          <div className='d-flex justify-content-center col-1'>
            <img
              className={
                filtered
                  ? 'dashboard-main-view-no-filter-icon'
                  : 'dashboard-main-view-filter-icon'
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
          <div className='col-5 dashboard-main-view-add-button-holder d-flex justify-content-end'>
            <button
              className='dashboard-main-view-add-button'
              onClick={() => setAddHangoutModal(true)}>
              + rolezinho
            </button>
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
          <div className='cards-holder animate__animated animate__fadeIn animate__faster'>
            <div className='row'>{searchAndFilter(events, 'events')}</div>
          </div>
        </TabPanel>
        <TabPanel>
          <div className='cards-holder animate__animated animate__fadeIn animate__faster'>
            <div className='row'>{searchAndFilter(hangouts, 'hangouts')}</div>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default MainView;
