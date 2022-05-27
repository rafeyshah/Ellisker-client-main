import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import './Admin.css';
import BlockUsers from './BlockUsers';
import CreateAdmin from './CreateAdmin';
import CreateEvent from './CreateEvent';

const AdminDashboard = () => {

	return (
		<div className='container admin-container'>
			
			<CreateEvent />
			<BlockUsers />
		</div>
	);
};

export default AdminDashboard;
