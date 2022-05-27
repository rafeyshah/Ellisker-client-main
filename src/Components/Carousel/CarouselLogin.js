import React from 'react';
import Login from '../LoginRegister.js/Login';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';
import { signOut } from 'firebase/auth';
import Register from '../LoginRegister.js/Register';
import { Nav } from 'react-bootstrap';

const CarouselLogin = () => {
	const [user, loading, error] = useAuthState(auth);
  console.log(user);
  const logout = () => {
    signOut(auth);
  };
  return (
    <div className='col-md-4 home-login-form'>
      <div className='d-flex justify-content-end'>
			{user ? (
                <button type='button' onClick={logout} className='btn btn-dark'>
                  signout
                </button>
              ) : (
                <Nav.Link as={Link} to='/login'>
                  <button type='button' className='btn btn-dark'>
                    Login
                  </button>
                </Nav.Link>
              )}
      </div>
      <div className='row g-0 home-login-logo-icons'>
        <div className='col-8 home-login-logo-holder'>
          <img
            src='./images/Logo.png'
            className='animate__animated animate__lightSpeedInLeft home-login-logo'
          />
        </div>
        <div className='col-4 d-flex justify-content-end home-login-fb-insta-logo-holder'>
          <a
            className='home-login-fb-logo'
            href='https://www.facebook.com/Ellsker'
            target={'_blank'}>
            <img src='./images/fb-url-icon.png' />
          </a>
          <a
            className='home-login-instagram-logo'
            href='https://www.instagram.com/elllsker/'
            target={'_blank'}>
            <img src='./images/instagram-url-icon.png' />
          </a>
        </div>
      </div>
      <Tabs>
        <TabList className='row g-0 home-login-form-tab-list'>
          <Tab
            className='col-6 home-login-form-tab-title'
            selectedClassName='home-login-form-tab-title-selected'>
            &nbsp;&nbsp;Entrar&nbsp;&nbsp;
          </Tab>
          <Tab
            className='col-6 home-login-form-tab-title pe-5'
            selectedClassName='home-login-form-tab-title-selected'>
            &nbsp;&nbsp;Cadastrar&nbsp;&nbsp;
          </Tab>
        </TabList>
        <TabPanel>
          <Login />
        </TabPanel>
        <TabPanel>
          <Register />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default CarouselLogin;
