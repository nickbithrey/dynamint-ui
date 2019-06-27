import {
	apiRequest
} from '~/redux/ajaxAction';

export const LOAD_MODELS = 'LOAD_MODELS';


export const load = () => apiRequest('LOAD_MODELS', 
		'http://localhost:9999/dynamint/api/v1/componentConfigurations', 
		'GET', 
		null,
		() => { return {type: 'LOAD_MODELS_REQUEST'} },
		res => { return {type: 'LOAD_MODELS_SUCCESS', payload: res} },
		err => { return {type: 'LOAD_MODELS_SUCCESS', payload: err} });
