import React from 'react';
import { shallow } from 'enzyme';

import SelectorTable from '~/lib/selector/SelectorTable';

describe('<SelectorTable /> rendering', () => {

	const props = {
		items: [
			{f: 'v', f2: 'v2'},
			{f: 'v3', f2: 'v4'}
		],
		load: jest.fn(() => []),
		columns: [
			{field: 'f'},
			{field: 'f2'}
		],
		selection: {
			count: 0
		}
	};
	
	let wrapper;
	
	beforeEach(() => {
		wrapper = shallow( <SelectorTable {...props} /> );
	});

	it('can render standard component with records', () => {
		expect(wrapper).toMatchSnapshot();
	});
		
});