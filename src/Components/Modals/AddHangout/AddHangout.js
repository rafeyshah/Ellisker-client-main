import React, { useState } from 'react';
import axios from 'axios';
import ReactRoundedImage from 'react-rounded-image';
import { Formik, Field, Form } from 'formik';
import toast, { Toaster } from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import AddHangoutValidation from './validation';
import 'react-datepicker/dist/react-datepicker.css';
import './AddHangout.css';

import auth from '../../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';

const AddHangout = ({ setHangouts, setAddHangoutModal }) => {
	const [startDate, setStartDate] = useState(new Date());
	const [titleClicked, setTitleClicked] = useState(false);
	const [descriptionClicked, setDescriptionClicked] = useState(false);
	const [locationClicked, setLocationClicked] = useState(false);
	const [user, loading] = useAuthState(auth);

	console.log("user",user?.uid.substring(0, 12).length)
	function ascii_to_hex(str)
  {
	var arr1 = [];
	for (var n = 0, l = str?.length; n < l; n ++) 
     {
		var hex = Number(str?.charCodeAt(n)).toString(16);
		arr1.push(hex);
	 }
	return arr1.join('');
   }

	 const e=ascii_to_hex(user?.uid.substring(0, 12))
	 console.log(e.length)
	const handleSubmit = (data) => {
		const toastLoadingID = toast.loading('Creating hangout...');
		const createdBy = JSON.parse(localStorage.getItem('currentUser'));
		
		axios
			.post('hangouts/add', {
				createdBy: e,
				title: data.title,
				description: data.description,
				location: data.location,
				date: startDate,
				uid:user?.uid
			})
			.then((response) => {
				console.log(response);
				toast.dismiss(toastLoadingID);
				toast.success('Hangout Created!');
				axios.get('hangouts/').then((res) => {
					//get all hangouts again with the newly added one
					setHangouts(res.data);
				});
			});
	};

	return (
		<div
			className='my-modal-container d-flex justify-content-center align-items-center animate__animated animate__fadeIn animate__faster'
			onClick={(e) => {
				e.preventDefault();
				if (e.target === e.currentTarget) setAddHangoutModal(false);
			}}
		>
			<Toaster />
			<div className='my-modal animate__animated animate__zoomIn animate__faster'>
				<div className='row add-hangout-header'>
					<div className='col-3 add-hangout-icon'>
						<ReactRoundedImage
							image={
								JSON.parse(localStorage.getItem('currentUser'))
									?.image
							}
							roundedColor='none'
							imageWidth='59.57'
							imageHeight='59.57'
							roundedSize='0'
						/>
					</div>
					<div className='col-9 add-hangout-text d-flex justify-content-end'>
						+ rolezinho
					</div>
				</div>
				<Formik
					initialValues={{
						title: '',
						description: '',
						location: '',
					}}
					validationSchema={AddHangoutValidation}
					validateOnMount={true}
				>
					{({ values, isValid, errors }) => {
						return (
							<Form class='contact100-form-hangout'>
								<div
									className={
										titleClicked && errors.title
											? 'wrap-input100-hangout invalid-input-hangout'
											: 'wrap-input100-hangout'
									}
									data-validate='Name is required'
								>
									<span class='label-input100-hangout'>
										titulo
									</span>
									<Field
										class='input100-hangout'
										type='text'
										name='title'
										placeholder='Vamos pra balada? pro barzinho? fazer alguma coisa…'
										onClick={() => setTitleClicked(true)}
									/>
									<span class='focus-input100-hangout'></span>
								</div>
								<div
									className={
										descriptionClicked && errors.description
											? 'wrap-input100-hangout invalid-input-hangout'
											: 'wrap-input100-hangout'
									}
									data-validate='Valid email is required: ex@abc.xyz'
								>
									<span class='label-input100-hangout'>
										descrição (opcional)
									</span>
									<Field
										class='input100-hangout'
										type='text'
										name='description'
										placeholder='descreva o seu hangout…'
										onClick={() =>
											setDescriptionClicked(true)
										}
									/>
									<span class='focus-input100-hangout'></span>
								</div>
								<div className='row g-0'>
									<div className='col-6 wrap-input100-hangout'>
										<span class='label-input100-hangout'>
											data
										</span>
										<div className='row'>
											<div className='col-10'>
												<DatePicker
													className='input100-hangout'
													selected={startDate}
													onChange={(date) =>
														setStartDate(date)
													}
													customInput={
														<Field
															class='input100-hangout'
															type='text'
															name='date'
														/>
													}
													dateFormat='dd/MM/yy'
													onKeyDown={(e) => {
														e.preventDefault();
													}}
												/>
											</div>
											<div className='col-2 ps-0 pe-0'>
												<img
													className='add-hangout-calendar-icon'
													src='./images/calendar-icon.png'
												/>
											</div>
										</div>
										<span class='focus-input100-hangout'></span>
									</div>
									<div className='col-2'></div>
									<div className='col-4 wrap-input100-hangout'>
										<span class='label-input100-hangout'>
											hora
										</span>
										<div className='row'>
											<div className='col-10'>
												<DatePicker
													className='input100-hangout'
													selected={startDate}
													onChange={(date) =>
														setStartDate(date)
													}
													customInput={
														<Field
															class='input100-hangout'
															type='text'
															name='hour'
														/>
													}
													showTimeSelect={true}
													showTimeSelectOnly={true}
													timeFormat='HH:mm'
													dateFormat='HH:mm'
													onKeyDown={(e) => {
														e.preventDefault();
													}}
												/>
											</div>
											<div className='col-2 ps-0 pe-0'>
												<img
													className='add-hangout-hour-icon'
													src='./images/hour-icon.png'
												/>
											</div>
										</div>

										<span class='focus-input100-hangout'></span>
									</div>
								</div>
								<div
									className={
										locationClicked && errors.location
											? 'wrap-input100-hangout invalid-input-hangout'
											: 'wrap-input100-hangout'
									}
									data-validate='Valid email is required: ex@abc.xyz'
								>
									<span class='label-input100-hangout'>
										endereço
									</span>
									<Field
										class='input100-hangout'
										type='text'
										name='location'
										placeholder='digite o local...'
										onClick={() => setLocationClicked(true)}
									/>
									<span class='focus-input100-hangout'></span>
								</div>
								<div class='row d-flex justify-content-center mt-5'>
									<div className='col-6 d-flex justify-content-end'>
										<button
											className='add-hangout-cancel-button'
											onClick={() => {
												setAddHangoutModal(false);
											}}
										>
											cancelar
										</button>
									</div>
									<div className='col-6 d-flex justify-content-start'>
										<button
											className='add-hangout-create-button'
											onClick={(e) => {
												e.preventDefault();
												if (!isValid)
													toast.error(
														'Please fill all fields!'
													);
												else handleSubmit(values);
											}}
										>
											criar
										</button>
									</div>
								</div>
							</Form>
						);
					}}
				</Formik>
			</div>
		</div>
	);
};

export default AddHangout;
