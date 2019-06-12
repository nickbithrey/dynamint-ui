import {
	apiRequest
} from '~/redux/ajaxAction';

export const LOAD_MODELS = 'LOAD_MODELS';


export const load = () => apiRequest('LOAD_MODELS', 
		'http://localhost:9999/dynamint/api/v1/modelComponents', 
		'GET', 
		null,
		() => { return {type: 'LOAD_MODELS_REQUEST'} },
		res => { return {type: 'LOAD_MODELS_SUCCESS', payload: res} },
		err => { return {type: 'LOAD_MODELS_SUCCESS', payload: err} });

export const create = model => apiRequest('CREATE_MODEL', 
		'http://localhost:9999/dynamint/api/v1/modelComponents', 
		'POST', 
		model,
		() => { return {type: 'CREATE_MODEL_REQUEST'} },
		res => { return {type: 'CREATE_MODEL_SUCCESS', payload: res} },
		err => { return {type: 'CREATE_MODEL_FAILURE', payload: err} });