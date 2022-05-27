import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const BlockUsers = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		axios.get('users/').then((response) => setUsers(response.data.users));
	}, []);

	const blockUser = (user) => {
		const toastLoadingID = toast.loading('Blocking user...');
		axios.post('users/block', { user_id: user._id }).then((response) => {
			axios.get('users/').then((response) => {
				setUsers(response.data.users);
				toast.dismiss(toastLoadingID);
				toast.success('User blocked!');
			});
		});
	};

	const unblockUser = (user) => {
		const toastLoadingID = toast.loading('Unblocking user...');
		axios.post('users/unblock', { user_id: user._id }).then((response) => {
			axios.get('users/').then((response) => {
				setUsers(response.data.users);
				toast.dismiss(toastLoadingID);
				toast.success('User unblocked!');
			});
		});
	};

	const RenderButton = (user) => {
		if (user.isBlocked) {
			return (
				<button
					class='btn btn-success'
					style={{ width: '100%' }}
					onClick={(e) => {
						e.preventDefault();
						unblockUser(user);
					}}
				>
					Unblock
				</button>
			);
		} else {
			return (
				<button
					class='btn btn-danger'
					style={{ width: '100%' }}
					onClick={(e) => {
						e.preventDefault();
						blockUser(user);
					}}
				>
					Block
				</button>
			);
		}
	};

	return (
		<div className='container mb-5'>
			<Toaster />
			<div className='d-flex justify-content-center'>
				<div style={{ width: '40%' }}>
					<h1 className='pt-5 pb-3'>Block Users</h1>
					<div className='table-responsive table-wrapper'>
						<table class='table table-bordered table-striped text-center table-sm'>
							<thead>
								<tr>
									<th className='align-middle' scope='col'>
										#
									</th>
									<th className='align-middle' scope='col'>
										Name
									</th>
									<th className='align-middle' scope='col'>
										Email
									</th>
									<th className='align-middle' scope='col'>
										Action
									</th>
								</tr>
							</thead>
							<tbody>
								{users.map((user, index) => {
									return (
										<tr className='animate__animated animate__fadeInLeft animate__faster'>
											<th
												scope='row'
												className='align-middle'
											>
												{index + 1}
											</th>
											<td className='align-middle'>
												{user.name}
											</td>
											<td className='align-middle'>
												{user.email}
											</td>
											<td className='align-middle'>
												{RenderButton(user)}
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BlockUsers;
