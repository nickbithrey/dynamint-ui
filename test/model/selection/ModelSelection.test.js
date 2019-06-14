import React from 'react';
import { shallow } from 'enzyme';

import ModelSelection from '~/model/selection/ModelSelection';
import TableRow from '~/lib/TableRow';

describe('<ModelSelection /> rendering', () => {

	it('renders standard record', () => {
		const details = {
			load: jest.fn(() => []), 
			models: {
				models: [
					{col1: 'col1'}
				]
			}
		};
		const wrapper = shallow( <ModelSelection {...details} /> );
		
		expect(wrapper).toMatchSnapshot();
	});
		
//		it('renders create button', () => {
//		const load = jest.fn(() => []);
//		const create = jest.fn(() => []);
//		const models = {
//			models: null
//		}
//		const wrapper = shallow( <Model load={load} create={create} models={models} /> );
//		
//		const link = wrapper.find(Link);
//		expect(link).toHaveLength(1);
//		expect(link.children().text()).toBe('Create');
//		expect(link.prop('to')).toBe('/models/create');
//		expect(link.prop('replace')).toBeFalsy();
//		
//		const route = wrapper.find(Route);
//		expect(route).toHaveLength(1);
//		expect(route.children().length).toBe(0);
//		expect(route.prop('path')).toBe('/models/:type');
//	});
	
});