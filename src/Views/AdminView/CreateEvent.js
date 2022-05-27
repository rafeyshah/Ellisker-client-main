import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import toast, { Toaster } from 'react-hot-toast';

const CreateEvent = () => {
	const [file, setFile] = useState('');
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [startDate, setStartDate] = useState(new Date());
	const [location, setLocation] = useState('');

	const handleSubmit = () => {
		const formData = new FormData();
		formData.append('title', title);
		formData.append('description', description);
		formData.append('date', startDate);
		formData.append('location', location);
		formData.append('file', file);
		const toastLoadingID = toast.loading('Creating event...');
		axios
			.post('events/add', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					'authorization': `Bearer ${localStorage.getItem('accessToken')}`
				},
			})
			.then((response) => {
				toast.dismiss(toastLoadingID);
				toast.success('Event created!');
				console.log(response.data);
			});
	};

	return (
		<div className='row d-flex justify-content-center'>
			<Toaster />
			<form style={{ width: '40%' }}>
				<h1 className='pt-5 pb-3'>Create Event</h1>
				<div class='mb-3'>
					<label for='formFile' class='form-label'>
						Image
					</label>
					<input
						class='form-control'
						type='file'
						id='formFile'
						onChange={(e) => {
							setFile(e.target.files[0]);
						}}
					/>
				</div>
				<div class='mb-3'>
					<label class='form-label'>Title</label>
					<input
						class='form-control'
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
				<div class='mb-3'>
					<label class='form-label'>Description</label>
					<textarea
						class='form-control'
						onChange={(e) => setDescription(e.target.value)}
						maxLength='170'
					/>
				</div>
				<div className='row'>
					<div className='col-6'>
						<label class='form-label'>Date</label>
						<DatePicker
							className='input100-hangout admin-input'
							selected={startDate}
							onChange={(date) => setStartDate(date)}
							dateFormat='dd/MM/yy'
							onKeyDown={(e) => {
								e.preventDefault();
							}}
						/>
					</div>
					<div className='col-6'>
						<label class='form-label'>Time</label>
						<DatePicker
							className='input100-hangout admin-input'
							selected={startDate}
							onChange={(date) => setStartDate(date)}
							showTimeSelect={true}
							showTimeSelectOnly={true}
							timeFormat='HH:mm'
							dateFormat='HH:mm'
							onKeyDown={(e) => {
								e.preventDefault();
							}}
						/>
					</div>
				</div>
				<div class='mb-3'>
					<label class='form-label'>Location</label>
					<input
						class='form-control'
						onChange={(e) => setLocation(e.target.value)}
					/>
				</div>
				<button
					class='btn btn-primary'
					onClick={(e) => {
						e.preventDefault();
						handleSubmit();
					}}
				>
					Create
				</button>
			</form>
		</div>
	);
};

export default CreateEvent;
