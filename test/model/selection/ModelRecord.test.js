import React from 'react';
import { shallow } from 'enzyme';

import ModelRecord from '~/model/selection/ModelRecord';
import TableRow from '~/lib/TableRow';

describe('<ModelRecord /> rendering', () => {

	it('renders standard record', () => {
		const record = {
			reference:'ref', 
			description: 'desc', 
			status: 'ACTIVE'
		};
		const wrapper = shallow( <ModelRecord {...record} /> );
		
		expect(wrapper).toMatchSnapshot();
	});
	
	it('has correct properties', () => {
		const record = {
			reference:'ref', 
			description: 'desc', 
			status: 'ACTIVE'
		};
		const wrapper = shallow( <ModelRecord {...record} /> );

		expect(wrapper.type()).toBe(TableRow);
		expect(wrapper.prop('record')).toStrictEqual(['ref','desc','ACTIVE']);
	});
		
});