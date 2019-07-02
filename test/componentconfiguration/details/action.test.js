import React from 'react';

import * as actions from '~/componentconfiguration/details/action';

describe('Component Configuration Selection reducer', () => {

	it('performs correct load action on edit request', () => {
		const uri = 'uri';
		const action = actions.load(uri, false);
		const expectedAction = {
			type: 'LOAD_COMP_CONFIG_REQUEST',
			apiCall: true,
			url: uri,
			method: 'GET'
		}
		const {
			notify,
			success,
			failure,
			...standardFields
		} = action;
		expect(standardFields).toEqual(expectedAction);
		expect(notify()).toEqual({type: 'LOAD_COMP_CONFIG_REQUEST'});
		expect(success('result')).toEqual({type: 'LOAD_COMP_CONFIG_SUCCESS', payload: 'result'});
		expect(failure('error')).toEqual({type: 'LOAD_COMP_CONFIG_FAILURE', payload: 'error'});
	});
	
	it('performs correct load action on create request', () => {
		const uri = 'uri';
		const action = actions.load(uri, true);
		const expectedAction = {
			type: 'LOAD_COMP_CONFIG_SUCCESS',
			payload: {
				links: {
					self: {
						href: 'http://localhost:9999/dynamint/api/v1/componentConfigurations'
					}
				}
			}
		}
		expect(action).toEqual(expectedAction);
	});
	
	it('performs correct clear action', () => {
		expect(actions.clear()).toEqual({type: 'CLEAR_COMP_CONFIG'});
	});
	
	it('performs correct update field action', () => {
		const field = {
			name: 'name',
			value: 'val'
		};
		expect(actions.updateField(field)).toEqual({
			type: 'UPDATE_COMP_CONFIG_FIELD',
			name: 'name',
			value: 'val'
		});
	});
	
	it('performs correct load action on edit request', () => {
		const config = {
			name: 'name',
			val: 'val'
		}
		const uri = 'uri';
		const action = actions.update(config, uri, false);
		const expectedAction = {
			type: 'UPDATE_COMP_CONFIG_REQUEST',
			apiCall: true,
			url: uri,
			method: 'PATCH',
			payload: config
		}
		const {
			notify,
			success,
			failure,
			...standardFields
		} = action;
		expect(standardFields).toEqual(expectedAction);
		expect(notify()).toEqual({type: 'UPDATE_COMP_CONFIG_REQUEST'});
		expect(success('result')).toEqual({type: 'UPDATE_COMP_CONFIG_SUCCESS', payload: 'result'});
		expect(failure('error')).toEqual({type: 'UPDATE_COMP_CONFIG_FAILURE', payload: 'error'});
	});
	
	it('performs correct load action on create request', () => {
		const config = {
			name: 'name',
			val: 'val'
		}
		const uri = 'uri';
		const action = actions.update(config, uri, true);
		const expectedAction = {
			type: 'UPDATE_COMP_CONFIG_REQUEST',
			apiCall: true,
			url: uri,
			method: 'POST',
			payload: config
		}
		const {
			notify,
			success,
			failure,
			...standardFields
		} = action;
		expect(standardFields).toEqual(expectedAction);
		expect(notify()).toEqual({type: 'UPDATE_COMP_CONFIG_REQUEST'});
		expect(success('result')).toEqual({type: 'UPDATE_COMP_CONFIG_SUCCESS', payload: 'result'});
		expect(failure('error')).toEqual({type: 'UPDATE_COMP_CONFIG_FAILURE', payload: 'error'});
	});
	
});