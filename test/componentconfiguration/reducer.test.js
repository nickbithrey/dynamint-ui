import React from 'react';

import reducer, { compConfigReducerRegistry } from '~/componentconfiguration/reducer';

describe('Component Configuration reducer', () => {

	it('initialises state', () => {
		compConfigReducerRegistry.register('selection', (state = {}, action) => ({...state}));
		let state;
		const newState = reducer(state, {type: 'default'});
		expect(newState).toEqual({selection: {}});
	});
	
	it('can register a new reducer', () => {
		compConfigReducerRegistry.register('selection', (state = {}, action) => ({...state}));
		let state;
		let newState = reducer(state, {type: 'default'});
		expect(newState).toEqual({selection: {}});
		
		compConfigReducerRegistry.register('details', (state = {}, action) => ({...state}));
		newState = reducer(newState, {type: 'default'});
		expect(newState).toEqual({selection: {}, details: {}});
	});
	
});