import reducerRegistry, { ReducerRegistry as CompConfigReducerRegistry } from '~/redux/ReducerRegistry';

export const compConfigReducerRegistry = new CompConfigReducerRegistry();

const initialState = {};

export default function reducer(state = initialState, action) {
	const reducerState = {...state};
	Object.entries(compConfigReducerRegistry.getReducers()).forEach(([key, value]) => {
		reducerState[key] = value(reducerState[key], action);
	})
	return reducerState;
}

reducerRegistry.register('componentConfiguration', reducer);