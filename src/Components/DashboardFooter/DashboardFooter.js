import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardFooter.css';

const DashboardFooter = ({ setAddHangoutModal }) => {
  const navigate = useNavigate();
  return (
    <div className='fixed-bottom dashboard-footer'>
      <div className='row'>
        <div className='col-4 d-flex justify-content-center'>
          <img
            className='dashboard-footer-home-icon'
            src='./images/dashboard-footer-home-icon.png'
            onClick={() => navigate('/dashboard-mobile')}
          />
        </div>
        <div className='col-4 d-flex justify-content-center'>
          <img
            className='dashboard-footer-add-icon'
            src='./images/dashboard-footer-add-icon.png'
            onClick={() => setAddHangoutModal(true)}
          />
        </div>
        <div className='col-4 d-flex justify-content-center'>
          <img
            className='dashboard-footer-chat-icon'
            src='./images/dashboard-footer-chat-icon.png'
            onClick={() => navigate('/dashboard-mobile/messages')}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardFooter;
