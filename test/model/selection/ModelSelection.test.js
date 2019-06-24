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
					{reference: 'reference', description: 'description', componentType: 'type'}
				]
			}
		};
		const wrapper = shallow( <ModelSelection {...details} /> );
		
		expect(wrapper).toMatchSnapshot();
	});
		
});