import React from 'react';
import { shallow } from 'enzyme';

import SelectorButtons from '~/lib/selector/SelectorButtons';

describe('<SelectorButtons /> rendering', () => {

	const props = {
		buttons: [
			{
				build: () => ({
					pathname: 'path',
					stateFn: sel => ({}),
					text: 'btnText',
					condition: sel => true,
				})
			}
		],
		selection: {
			count: 0
		}
	};
	
	let wrapper;
	
	beforeEach(() => {
		wrapper = shallow( <SelectorButtons {...props} /> );
	});

	it('can render standard component with records', () => {
		expect(wrapper).toMatchSnapshot();
	});
		
});