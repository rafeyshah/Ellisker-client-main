const yup = require('yup');

const registerValidation = yup.object().shape({
	name: yup
		.string()
		.matches(/^[A-Za-z ]*$/)
		.required(),
	// contact: yup.string().matches(/^\(\d{3}\) \d{7}$/).required(),
	email: yup.string().email().required(),
	// address: yup.string().required(),
	// username: yup.string().matches(/^\S+$/).required(),
	password: yup.string().required(),
	// confirmPassword: yup.string().required()
});
export default registerValidation;
