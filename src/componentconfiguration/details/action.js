import {
	apiRequest
} from '~/redux/ajaxAction';

export const LOAD = 'LOAD_COMP_CONFIG';
export const LOAD_REQUEST = 'LOAD_COMP_CONFIG_REQUEST';
export const LOAD_SUCCESS = 'LOAD_COMP_CONFIG_SUCCESS';
export const LOAD_FAILURE = 'LOAD_COMP_CONFIG_FAILURE';
export const CLEAR = 'CLEAR_COMP_CONFIG';
export const UPDATE_FIELD = 'UPDATE_COMP_CONFIG_FIELD';
export const UPDATE = 'UPDATE_COMP_CONFIG';
export const UPDATE_REQUEST = 'UPDATE_COMP_CONFIG_REQUEST';
export const UPDATE_SUCCESS = 'UPDATE_COMP_CONFIG_SUCCESS';
export const UPDATE_FAILURE = 'UPDATE_COMP_CONFIG_FAILURE';

const GET_COMP_CONFIGS = 'http://localhost:9999/dynamint/api/v1/componentConfigurations';

export const load = (uri, isCreate) => {
	if (isCreate) {
		return {
			type: LOAD_SUCCESS,
			payload: { links: { self: { href: GET_COMP_CONFIGS } } }
		};
	}
	return apiRequest(LOAD, 
		uri, 
		'GET', 
		null,
		() => ({type: LOAD_REQUEST}),
		res => ({type: LOAD_SUCCESS, payload: res}),
		err => ({type: LOAD_FAILURE, payload: err})
	);
}

export const clear = () => ({
	type: CLEAR
});

export const updateField = ({name, value}) => ({
	type: UPDATE_FIELD,
	name: name,
	value: value
});

export const update = (config, uri, isCreate) => {
	const type = isCreate ? 'POST' : 'PATCH';
	return apiRequest(UPDATE, 
		uri, 
		type, 
		config,
		() => ({type: UPDATE_REQUEST}),
		res => ({type: UPDATE_SUCCESS, payload: res}),
		err => ({type: UPDATE_FAILURE, payload: err})
	);
};
