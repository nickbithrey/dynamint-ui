//import axios from 'axios';
import fetch from 'cross-fetch';

const defaultHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE',
	'Accept': 'application/json',
	'Content-Type': 'application/json'
};

export default store => next => action => {
	if (!action.apiCall) {
		// action is not an api call. 
		// continue
		return next(action);
	}

	// notify that action is in progress
	next(action.notify());
	
	const config = {
		headers: defaultHeaders,
		method: action.method
	};
	if (action.payload) {
		config.body = JSON.stringify(action.payload);
	}
	
	fetch(action.url, config)
		.then(response => {
			if (response.ok) {
				return response.json()
			}
			var error = new Error(response.statusText);
			error.response = response;
			throw error;
		}).then(json => {
			// dispatch successful action
			return next(action.success(json));
		}).catch(error => {
			// dispatch failure action
			return next(action.failure(error));
		});
	
//	const config = {
//		headers: defaultHeaders,
//		method: action.method,
//		url: action.url,
//		params: action.params,
//		data: action.payload
//	};
//	
//	axios(config)
//	.then(res => {
//		// dispatch successful action
//		return next(action.success(res));
//	}, err => {
//		// dispatch failure action
//		return next(action.failure(err));
//	})
}