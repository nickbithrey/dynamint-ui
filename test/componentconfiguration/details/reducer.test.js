import React from 'react';

import reducer from '~/componentconfiguration/details/reducer';
import * as actions from '~/componentconfiguration/details/action';

describe('Component Configuration Details reducer', () => {

	it('initialises state', () => {
		const newState = reducer(null, {type: 'default'});
		expect(newState).toEqual({});
	});
	
	test('load action', () => {
		const newState = reducer({}, {type: actions.LOAD});
		expect(newState).toEqual({loading: true, record: {}});
	});
	
	test('load request action', () => {
		const newState = reducer({}, {type: actions.LOAD_REQUEST});
		expect(newState).toEqual({loading: true, record: {}});
	});
	
	test('load success action', () => {
		const action = {
			type: actions.LOAD_SUCCESS,
			payload: 'payload'
		}
		const newState = reducer({}, action);
		const expectedState = {
			loading: false, 
			record: 'payload'
		}
		expect(newState).toEqual(expectedState);
	});
	
	test('load failure action', () => {
		const newState = reducer({record: {}}, {type: actions.LOAD_FAILURE, payload: 'error'});
		expect(newState).toEqual({loading: false, error: 'error'});
	});
	
	test('clear action', () => {
		const newState = reducer({record: {}}, {type: actions.CLEAR});
		expect(newState).toEqual({loading: false});
	});
	
	test('update details success action', () => {
		const newState = reducer({}, {type: actions.UPDATE_FIELD, name: 'name', value: 'val'});
		expect(newState).toEqual({record: {name: 'val'}});
	});
	
	test('default action', () => {
		const origState = {
			key1: 'val1',
			key2: 'val2'
		}
		const newState = reducer(origState, {type: 'non-action'});
		expect(newState).toEqual(origState);
	});
	
});