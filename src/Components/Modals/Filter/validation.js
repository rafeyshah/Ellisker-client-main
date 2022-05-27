const yup = require('yup');

const FilterValidation = yup.object().shape({
	location: yup.string(),
});
export default FilterValidation;
