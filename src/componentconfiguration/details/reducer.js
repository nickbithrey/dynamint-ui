import { compConfigReducerRegistry } from '../reducer';
import * as actions from './action';

const initialState = {};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case actions.LOAD:
			return {...state, loading: true, record: {}};
		case actions.LOAD_REQUEST:
			return {...state, loading: true, record: {}};
		case actions.LOAD_SUCCESS:
			return {...state, loading: false, record: action.payload};
		case actions.LOAD_FAILURE:
			return delRecord({...state, loading: false, error: action.payload});
		case actions.CLEAR:
			return delRecord({...state, loading: false});
		case actions.UPDATE_FIELD:
			const record = {...state.record, [action.name]: action.value};
			return {...state, record}
		default:
			return {...state};
	}
}

function delRecord({record, ...state}) {
	return state;
}

compConfigReducerRegistry.register('details', reducer);