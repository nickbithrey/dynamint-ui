import React from 'react';
import { shallow } from 'enzyme';

import CompConfig from '~/componentconfiguration/ComponentConfiguration';

describe('<ComponentConfiguration /> rendering', () => {

	it('matches snapshot', () => {
		const wrapper = shallow( <CompConfig /> );
		
		expect(wrapper).toMatchSnapshot();
	});
	
	it('will render the full set of routes', () => {
		const wrapper = shallow( <CompConfig /> );

		const switchWrapper = wrapper.find('Switch');
		expect(switchWrapper).toHaveLength(1);
		expect(switchWrapper.find('Route')).toHaveLength(2);
	});
		
});