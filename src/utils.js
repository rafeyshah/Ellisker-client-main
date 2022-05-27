export const limitText = (str, limit) => {
	if (str.length > limit) {
		str = str.slice(0, -(str.length - limit));
		str = str + '...';
	}
	return str;
};
