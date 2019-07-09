import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import reducerRegistry from './ReducerRegistry'
import thunkMiddleware from 'redux-thunk'
import { combineReducers } from 'redux';
import ajaxMiddleware from './ajaxMiddleware';
import springDataRestMiddleware from './springDataRestMiddleware';
import stateStorage from '../service/stateStorage'
import throttle from 'lodash.throttle';

stateStorage.init({name: 'dynamint-ui', adaptor: 'localStorage'});

const initialState = stateStorage.loadState({});

// Preserve initial state for not-yet-loaded reducers
const combine = (reducers) => {
	const reducerNames = Object.keys(reducers);
	Object.keys(initialState).forEach(item => {
		if (reducerNames.indexOf(item) === -1) {
			reducers[item] = state => initialState[item];
		}
	});
	return combineReducers(reducers);
};

const reducer = state => initialState;

const store = createStore(reducer, applyMiddleware(ajaxMiddleware, springDataRestMiddleware, thunkMiddleware, logger));

store.subscribe(throttle(() => {
	stateStorage.storeSubscribe(store.getState())
}, 1000));

reducerRegistry.setChangeListener(reducers => {
	store.replaceReducer(combine(reducers));
});

export default store;