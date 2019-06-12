export const apiRequest = (type, url, method, data, notify, success, failure) => {
	let request = {
		type: type + '_REQUEST',
		apiCall: true,
		url: url,
		method: method,
		notify: notify,
		success: success,
		failure: failure
	};
	if (data) {
		request.payload = data;
	}
	return request;
}