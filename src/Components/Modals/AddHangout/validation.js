const yup = require('yup');

const AddHangoutValidation = yup.object().shape({
	title: yup.string().required(),
	description: yup.string().required(),
	location: yup.string().required(),
});
export default AddHangoutValidation;
