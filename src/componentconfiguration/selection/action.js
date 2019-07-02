import {
	apiRequest
} from '~/redux/ajaxAction';

export const LOAD = 'LOAD_COMP_CONFIGS';
export const LOAD_REQUEST = 'LOAD_COMP_CONFIGS_REQUEST';
export const LOAD_SUCCESS = 'LOAD_COMP_CONFIGS_SUCCESS';
export const LOAD_FAILURE = 'LOAD_COMP_CONFIGS_FAILURE';
export const CLEAR = 'CLEAR_COMP_CONFIGS';

const GET_COMP_CONFIGS = 'http://localhost:9999/dynamint/api/v1/componentConfigurations';

export const load = () => apiRequest(LOAD, 
		GET_COMP_CONFIGS, 
		'GET', 
		null,
		() => ({type: LOAD_REQUEST}),
		res => ({type: LOAD_SUCCESS, payload: res}),
		err => ({type: LOAD_FAILURE, payload: err})
);
