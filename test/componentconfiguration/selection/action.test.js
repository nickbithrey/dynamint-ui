import React from 'react';

import { load } from '~/componentconfiguration/selection/action';

describe('Component Configuration Selection reducer', () => {

	it('performs correct load action', () => {
		const action = load();
		const expectedAction = {
			type: 'LOAD_COMP_CONFIGS_REQUEST',
			apiCall: true,
			url: 'http://localhost:9999/dynamint/api/v1/componentConfigurations',
			method: 'GET'
		}
		const {
			notify,
			success,
			failure,
			...standardFields
		} = action;
		expect(standardFields).toEqual(expectedAction);
		expect(notify()).toEqual({type: 'LOAD_COMP_CONFIGS_REQUEST'});
		expect(success('result')).toEqual({type: 'LOAD_COMP_CONFIGS_SUCCESS', payload: 'result'});
		expect(failure('error')).toEqual({type: 'LOAD_COMP_CONFIGS_FAILURE', payload: 'error'});
	});
});