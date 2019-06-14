import React from 'react';
import { shallow } from 'enzyme';

import ModelDetails from '~/model/details/ModelDetails';
import { Route, Link } from 'react-router-dom';

describe('<ModelDetails /> rendering', () => {

	it('renders standard component', () => {
		const load = jest.fn(() => []);
		const update = jest.fn(() => []);
		const create = jest.fn(() => []);
		const clear = jest.fn(() => []);
		const details = {
			reference: 'ref',
			description: 'desc'
		};
		const match = {
			params: {
				type: 'create'
			}
		};
		const location = {
			state: {}
		};
		const history = {
			goBack: jest.fn(() => [])
		};
		const wrapper = shallow( <ModelDetails 
				load={load} 
				update={update} 
				create={create} 
				clear={clear} 
				details={details}
				match={match}
				location={location}
				history={history}
		/> );
		
		expect(wrapper).toMatchSnapshot();
	});
});