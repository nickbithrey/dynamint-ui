import React from 'react';

import reducer from '~/componentconfiguration/selection/reducer';
import * as actions from '~/componentconfiguration/selection/action';
import { UPDATE_SUCCESS } from '~/componentconfiguration/details/action';

describe('Component Configuration Selection reducer', () => {

	it('initialises state', () => {
		const newState = reducer(null, {type: 'default'});
		expect(newState).toEqual({});
	});
	
	test('load action', () => {
		const newState = reducer({}, {type: actions.LOAD});
		expect(newState).toEqual({loading: false, items: []});
	});
	
	test('load request action', () => {
		const newState = reducer({}, {type: actions.LOAD_REQUEST});
		expect(newState).toEqual({loading: true, items: []});
	});
	
	test('load success action', () => {
		const action = {
			type: actions.LOAD_SUCCESS,
			payload: {
				data: {
					componentConfigurations: [
						{
							reference: 'ref',
							description: 'desc',
							componentType: 'type',
							_links: {
								self: {
									href: 'url'
								}
							}
						}
					]
				},
				page: {
					details: 'details'
				}
			}
		}
		const newState = reducer({}, action);
		const expectedState = {
			loading: false, 
			items: [
				{
					reference: 'ref',
					description: 'desc',
					componentType: 'type',
					uri: 'url'
				}
			],
			page: {
				details: 'details'
			},
			uri: 'http://localhost:9999/dynamint/api/v1/componentConfigurations'
		}
		expect(newState).toEqual(expectedState);
	});
	
	test('load failure action', () => {
		const newState = reducer({items: []}, {type: actions.LOAD_FAILURE, payload: 'error'});
		expect(newState).toEqual({loading: false, error: 'error'});
	});
	
	test('clear action', () => {
		const newState = reducer({items: []}, {type: actions.CLEAR});
		expect(newState).toEqual({loading: false});
	});
	
	test('update details success action', () => {
		const newState = reducer({items: []}, {type: UPDATE_SUCCESS});
		expect(newState).toEqual({loading: false});
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