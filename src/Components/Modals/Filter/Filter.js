import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import toast, { Toaster } from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Filter.css';
import FilterValidation from './validation';

const Filter = ({
	setFilterModal,
	setFilteredLocation,
	setFilteredDate,
	setFiltered,
}) => {
	const [startDate, setStartDate] = useState(new Date());
	const [locationClicked, setLocationClicked] = useState(false);

	const handleSubmit = (data) => {
		setFilteredDate(startDate);
		setFilteredLocation(data.location);
		setFiltered(true);
		setFilterModal(false);
	};

	return (
		<div
			className='my-modal-container d-flex justify-content-center align-items-center animate__animated animate__fadeIn animate__faster'
			onClick={(e) => {
				e.preventDefault();
				if (e.target === e.currentTarget) setFilterModal(false);
			}}
		>
			<Toaster />
			<div className='my-modal animate__animated animate__zoomIn animate__faster'>
				<div className='d-flex justify-content-end filter-header'>
					<img
						className='filter-modal-filter-icon'
						src='./images/filter-icon-colored.png'
					/>
					<span className='filter-text'>Filtrar</span>
				</div>
				<Formik
					initialValues={{
						location: '',
					}}
					validationSchema={FilterValidation}
					validateOnMount={true}
				>
					{({ values, isValid, errors }) => {
						return (
							<Form class='contact100-form-filter'>
								<div className='row g-0'>
									<div className='col-6 wrap-input100-filter'>
										<span class='label-input100-filter'>
											data
										</span>
										<div className='row'>
											<div className='col-10'>
												<DatePicker
													className='input100-filter'
													selected={startDate}
													onChange={(date) =>
														setStartDate(date)
													}
													customInput={
														<Field
															class='input100-filter'
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
												<img src='./images/calendar-icon.png' />
											</div>
										</div>
										<span class='focus-input100-filter'></span>
									</div>
									<div className='col-2'></div>
									<div className='col-4 wrap-input100-filter'>
										<span class='label-input100-filter'>
											hora
										</span>
										<div className='row'>
											<div className='col-10'>
												<DatePicker
													className='input100-filter'
													selected={startDate}
													onChange={(date) =>
														setStartDate(date)
													}
													customInput={
														<Field
															class='input100-filter'
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
												<img src='./images/hour-icon.png' />
											</div>
										</div>
										<span class='focus-input100-filter'></span>
									</div>
								</div>
								<div
									className={
										locationClicked && errors.location
											? 'wrap-input100-filter invalid-input-filter'
											: 'wrap-input100-filter'
									}
									data-validate='Valid email is required: ex@abc.xyz'
								>
									<span class='label-input100-filter'>
										endereço
									</span>
									<Field
										class='input100-filter'
										type='text'
										name='location'
										placeholder='Enter your password'
										onClick={() => setLocationClicked(true)}
									/>
									<span class='focus-input100-filter'></span>
								</div>
								<div class='row d-flex justify-content-center mt-5'>
									<div className='col-6 d-flex justify-content-end'>
										<button
											className='filter-cancel-button'
											onClick={() => {
												setFilterModal(false);
											}}
										>
											cancelar
										</button>
									</div>
									<div className='col-6 d-flex justify-content-start'>
										<button
											className='filter-filter-button'
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

export default Filter;
