import React from 'react';

/**
 * A hook for throttling user input - useful for limiting expensive calculations
 * @param {function} cb The function to be called after the timeout. Gets passed the input's value
 * @param {number} timeout The time to wait before firing the callback, once typing ceases
 * @returns 
 */
const useTypingTimeout = (cb, timeout = 200) => {
	const [typingTimeout, setTypingTimeout] = React.useState(0);

	const handleChange = (e) => {
			const { value } = e.target;

			if(typingTimeout) {
					clearTimeout(typingTimeout);
			}

			setTypingTimeout(setTimeout(() => {
					cb(value);
			}, timeout));
	}

	return {
		handleChange
	}
}

export default useTypingTimeout;