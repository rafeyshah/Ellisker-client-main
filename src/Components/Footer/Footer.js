import React from 'react';
import './Footer.css';

const Footer = () => {
	return (
		<div className='row g-0 footer-container'>
			{/* <div className='row'> */}
			<div className='col-6 d-flex justify-content-center'>
				Ellsker {new Date().getFullYear()} Copyright
			</div>
			<div className='col-6 d-flex justify-content-center'>
				Termos de uso | Privacidade
			</div>
			{/* </div> */}
		</div>
	);
};

export default Footer;
