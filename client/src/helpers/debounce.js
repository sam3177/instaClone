const debounce = (func, delay=1000) => {
	let timerId;
	return (...args) => {
		timerId && clearTimeout(timerId);
		timerId = setTimeout(() => func.apply(null, args), delay);
	};
};
export default debounce;