import React from 'react';
import Footer from '../Footer/Footer';

const CarouselContent = () => {
	return (
		<div className='col-8 home-content'>
			<div className='row home-content-logo-holder'>
				<img
					src='./images/Logo.png'
					className='animate__animated animate__lightSpeedInRight home-content-logo'
				/>
			</div>
			<div className='row home-content-title'>Cada momento é único</div>
			<div className='row home-content-text'>
				Tenha novas experiências em diferentes lugares
			</div>
			<Footer />
		</div>
	);
};

export default CarouselContent;
