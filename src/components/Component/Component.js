/*
 * Import React dependencies
 */
import React from 'react';

class Component extends React.Component {
	constructor(props) {
		super(props);
	}

	static getDerivedStateFromError(error) {
		// Update state so the next render will show the fallback UI.
		console.error(error);
		return { hasError: true };
	}

	componentDidCatch(error, errorInfo) {
		// You can also log the error to an error reporting service
		console.error(error, errorInfo);
	}
}

export default Component;
