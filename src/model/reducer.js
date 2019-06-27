import reducerRegistry from '../redux/reducer';

const initialState = {};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case 'UPDATE_FIELD':
			return {...state, details: {...state.details, ...action.field}}
		case 'LOAD_MODELS':
		case 'LOAD_MODELS_REQUEST':
			return {...state, models: []};
		case 'LOAD_MODELS_SUCCESS':
			let modelRows = action.payload.data.componentConfigurations.map(model => { 
				return {reference: model.reference, description: model.description, componentType: model.componentType, uri: model._links.self.href};
			});
			return {...state, models: modelRows, page: action.payload.page};
		case 'LOAD_MODEL':
		case 'LOAD_MODEL_REQUEST':
			return {...state, details: {}};
		case 'LOAD_MODEL_SUCCESS':
			return {...state, details: {...action.payload}};
		case 'CLEAR_MODEL':
			return {...state, details: null};
		case 'CREATE_MODEL_SUCCESS':
		case 'UPDATE_MODEL_SUCCESS':
			return {...state, models: null};
		case 'CREATE_MODEL_FAILURE':
		case 'UPDATE_MODEL_FAILURE':
			return {...state, failure: action.payload.response.message};
		default:
			return {...state};
	}
}



reducerRegistry.register('models', reducer);