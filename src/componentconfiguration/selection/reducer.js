import { compConfigReducerRegistry } from '../reducer';
import * as actions from './action';
import { UPDATE_SUCCESS } from '../details/action';

const initialState = {};

const GET_COMP_CONFIGS = 'http://localhost:9999/dynamint/api/v1/componentConfigurations';

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case actions.LOAD:
			return {...state, loading: false, items: []};
		case actions.LOAD_REQUEST:
			return {...state, loading: true, items: []};
		case actions.LOAD_SUCCESS:
			let records = action.payload.data.componentConfigurations.map(config => { 
				return {
					reference: config.reference, 
					description: config.description, 
					componentType: config.componentType, 
					uri: config._links.self.href
				};
			});
			return {...state, loading: false, items: records, page: action.payload.page, uri: GET_COMP_CONFIGS};
		case actions.LOAD_FAILURE:
			return delItems({...state, loading: false, error: action.payload});
		case actions.CLEAR:
		case UPDATE_SUCCESS:
			return delItems({...state, loading: false});
		default:
			return {...state};
	}
}

function delItems({items, ...state}) {
	return state;
}

compConfigReducerRegistry.register('selection', reducer);