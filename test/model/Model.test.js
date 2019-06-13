import React from 'react';
import { shallow } from 'enzyme';

import Model from '~/model/Model';
import ModelDetails from '~/model/ModelDetails';
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
	
	it('renders create button', () => {
		const load = jest.fn(() => []);
		const create = jest.fn(() => []);
		const models = {
			models: null
		}
		const wrapper = shallow( <Model load={load} create={create} models={models} /> );
		
		const link = wrapper.find(Link);
		expect(link).toHaveLength(1);
		expect(link.children().text()).toBe('Create');
		expect(link.prop('to')).toBe('/models/create');
		expect(link.prop('replace')).toBeFalsy();
		
		const route = wrapper.find(Route);
		expect(route).toHaveLength(1);
		expect(route.children().length).toBe(0);
		expect(route.prop('path')).toBe('/models/:type');
	});

	it('renders routes', () => {
		const load = jest.fn(() => []);
		const create = jest.fn(() => []);
		const models = {
			models: null
		}
		const wrapper = shallow( <Model load={load} create={create} models={models} /> );
		
		const route = wrapper.find(Route);
		expect(route).toHaveLength(1);
		expect(route.children().length).toBe(0);
		expect(route.prop('path')).toBe('/models/:type');
	});
});