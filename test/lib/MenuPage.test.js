import React from 'react';
import { shallow } from 'enzyme';

import MenuPage from '~/lib/MenuPage';

const Selection = () => <h1>Selection</h1>;
const Details = () => <h1>Details</h1>;

describe('<MenuPage /> rendering', () => {

	it('matches snapshot', () => {
		const routes = [
			{exact: true, path: '/compconfig', component: Selection},
			{exact: false, path: '/compconfig/:type', component: Details}
		];
		const wrapper = shallow( <MenuPage routes={routes} /> );
		
		expect(wrapper).toMatchSnapshot();
	});
	
	it('will render the full set of routes', () => {
		const routes = [
			{exact: true, path: '/compconfig', component: Selection},
			{exact: false, path: '/compconfig/:type', component: Details}
		];
		const wrapper = shallow( <MenuPage routes={routes} /> );

		const switchWrapper = wrapper.find('Switch');
		expect(switchWrapper).toHaveLength(1);
		const routeWrappers = switchWrapper.find('Route');
		expect(routeWrappers).toHaveLength(routes.length);
		routes.forEach((r,i) => {
			expect(routeWrappers.at(i).prop('path')).toBe(r.path);
			expect(routeWrappers.at(i).prop('exact')).toBe(r.exact);
			expect(routeWrappers.at(i).prop('component')).toBe(r.component);
		})
	});
		
});
	
