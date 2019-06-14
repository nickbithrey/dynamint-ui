import React from 'react';
import { shallow } from 'enzyme';

import Model from '~/model/Model';
import { Route, Link } from 'react-router-dom';

describe('<Model /> rendering', () => {

	it('renders standard component', () => {
		const load = jest.fn(() => []);
		const create = jest.fn(() => []);
		const models = {
			models: null
		}
		const wrapper = shallow( <Model load={load} create={create} models={models} /> );
		
		expect(wrapper).toMatchSnapshot();
	});
	
	it('renders routes', () => {
		const load = jest.fn(() => []);
		const create = jest.fn(() => []);
		const models = {
			models: null
		}
		const wrapper = shallow( <Model load={load} create={create} models={models} /> );
		
		const routes = wrapper.find(Route);
		expect(routes).toHaveLength(2);
		
		const route1 = routes.at(0);
		expect(route1.children().length).toBe(0);
		expect(route1.prop('path')).toBe('/models');
		
		const route2 = routes.at(1);
		expect(route2.children().length).toBe(0);
		expect(route2.prop('path')).toBe('/models/:type');
	});
});
