import {
	apiRequest
} from '~/redux/ajaxAction';

export const load = uri => apiRequest('LOAD_MODEL', 
		uri, 
		'GET', 
		null,
		() => { return {type: 'LOAD_MODEL_REQUEST'} },
		res => { return {type: 'LOAD_MODEL_SUCCESS', payload: res} },
		err => { return {type: 'LOAD_MODEL_FAILURE', payload: err} });

export const update = (uri, model) => apiRequest('UPDATE_MODEL', 
		uri, 
		'PATCH',
		model,
		() => { return {type: 'UPDATE_MODEL_REQUEST'} },
		res => { return {type: 'UPDATE_MODEL_SUCCESS', payload: res} },
		err => { return {type: 'UPDATE_MODEL_FAILURE', payload: err} });

export const create = model => apiRequest('CREATE_MODEL', 
		'http://localhost:9999/dynamint/api/v1/componentConfigurations', 
		'POST', 
		model,
		() => { return {type: 'CREATE_MODEL_REQUEST'} },
		res => { return {type: 'CREATE_MODEL_SUCCESS', payload: res} },
		err => { return {type: 'CREATE_MODEL_FAILURE', payload: err} });

export const clear = () => {
	return {
		type: 'CLEAR_MODEL'
	};
};

export const updateField = (field) => {
	return {
		type: 'UPDATE_FIELD',
		field: field
	};
}