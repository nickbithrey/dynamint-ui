import React from 'react';
import { shallow } from 'enzyme';

import Loading from '~/lib/Loading';

describe('<Loading /> rendering', () => {

	it('renders a loading text', () => {
		const wrapper = shallow( <Loading /> );
		
		expect(wrapper).toMatchSnapshot();
	});
	
		
});