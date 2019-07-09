import React from 'react';
import { shallow } from 'enzyme';

import SelectorTitle from '~/lib/selector/SelectorTitle';

describe('<SelectionTitle /> rendering', () => {

	const props = {
		title: 'titleText'
	};
	
	let wrapper;
	
	beforeEach(() => {
		wrapper = shallow( <SelectorTitle {...props} /> );
	});

	it('will render title in h1 tag', () => {
		expect(wrapper.find('h1').text()).toBe(props.title);
	});
	
	it('will return nothing when no title is supplied', () => {
		wrapper = shallow( <SelectorTitle /> );
		
		expect(wrapper.find('h1')).toHaveLength(0);
	});
		
});