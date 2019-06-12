export default store => next => action => {
	let payload = action.payload;
	if (!payload || !(payload._embedded && payload._links)) {
		// not a spring data rest call. 
		// continue
		return next(action);
	}
	
	return next({
		...action,
		payload: {
			headers: payload.headers,
			data: payload._embedded,
			links: payload._links,
			page: payload.page
		}
	})
}