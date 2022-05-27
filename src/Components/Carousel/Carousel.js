import React, { useState, useEffect } from 'react';
import 'bootstrap/js/dist/carousel';
import './Carousel.css';
import CarouselContent from './CarouselContent';
import CarouselLogin from './CarouselLogin';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';
import { signOut } from 'firebase/auth';

const Carousel = () => {

  return (
    <div
      id='carouselExampleIndicators'
      class='carousel slide vertical animate__animated animate__fadeIn'
      data-bs-ride='carousel'
    >
      <div class='carousel-indicators'>
        <button
          type='button'
          data-bs-target='#carouselExampleIndicators'
          data-bs-slide-to='0'
          class='active'
          aria-current='true'
          aria-label='Slide 1'
        ></button>
        <button
          type='button'
          data-bs-target='#carouselExampleIndicators'
          data-bs-slide-to='1'
          aria-label='Slide 2'
        ></button>
        <button
          type='button'
          data-bs-target='#carouselExampleIndicators'
          data-bs-slide-to='2'
          aria-label='Slide 3'
        ></button>
        <button
          type='button'
          data-bs-target='#carouselExampleIndicators'
          data-bs-slide-to='3'
          aria-label='Slide 4'
        ></button>
      </div>
      <div className='row g-0'>
        <CarouselContent />
        <CarouselLogin />
      </div>
      <div class='carousel-inner'>
        <div class='carousel-item active my-carousel-img-holder'>
          <img
            src='./images/page-1.png'
            class='d-block w-100 my-carousel-img'
          />
        </div>
        <div class='carousel-item my-carousel-img-holder'>
          <img
            src='./images/page-2.png'
            class='d-block w-100 my-carousel-img'
          />
        </div>
        <div class='carousel-item my-carousel-img-holder'>
          <img
            src='./images/page-3.png'
            class='d-block w-100 my-carousel-img'
          />
        </div>
        <div class='carousel-item my-carousel-img-holder'>
          <img
            src='./images/page-4.png'
            class='d-block w-100 my-carousel-img'
          />
        </div>
      </div>
    </div>
  );
};

export default Carousel;
