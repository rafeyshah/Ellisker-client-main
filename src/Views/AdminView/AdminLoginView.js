import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const AdminLoginView = () => {
	let navigate = useNavigate();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = () => {
		const toastLoadingID = toast.loading('Logging in...');
		axios
			.post('admins/login', { username, password })
			.then((response) => {
				toast.dismiss(toastLoadingID);
				sessionStorage.setItem(
					'currentAdmin',
					JSON.stringify(response.data)
				);
				navigate('/admin-dashboard');
			})
			.catch((err) => {
				if (!err.response.data.isUsernameMatch) {
					toast.dismiss(toastLoadingID);
					toast.error('Invalid username!');
				}
				if (
					err.response.data.isUsernameMatch &&
					!err.response.data.isPasswordMatch
				) {
					toast.dismiss(toastLoadingID);
					toast.error('Incorrect password!');
				}
			});
	};

	return (
		<div className='container'>
			<Toaster />
			<div className='row d-flex justify-content-center'>
				<form style={{ width: '40%' }}>
					<h1 className='pt-5 pb-3'>Admin Login</h1>
					<div class='mb-3'>
						<label class='form-label'>Username</label>
						<input
							class='form-control'
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>
					<div class='mb-3'>
						<label class='form-label'>Password</label>
						<input
							class='form-control'
							type='password'
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<button
						class='btn btn-primary'
						onClick={(e) => {
							e.preventDefault();
							handleSubmit();
						}}
					>
						Login
					</button>
				</form>
			</div>
		</div>
	);
};

export default AdminLoginView;
