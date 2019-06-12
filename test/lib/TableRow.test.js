import React from 'react';
import { shallow } from 'enzyme';

import TableRow from '~/lib/TableRow';

describe('<TableRow /> rendering', () => {

	it('can render standard table row with records', () => {
		const records = [
			'col1',
			'col2',
			'col3'
		]
		const wrapper = shallow( <TableRow record={records} /> );
		
		expect(wrapper).toMatchSnapshot();
	});
	
	it('renders table row with no elements', () => {
		const wrapper = shallow( <TableRow record={[]} /> );

		expect(wrapper.find('td')).toHaveLength(0);
	});
		
	it('renders table row with same number of elements in supplied list', () => {
		const records = [
			"",
			"",
			""
		]
		const load = jest.fn(() => []);
		const wrapper = shallow( <TableRow record={records} /> );
		
		expect(wrapper.find('td')).toHaveLength(records.length);
	});
		
	it('can render different data types', () => {
		const time = Date.now();
		const records = [
			"col1",
			1,
			time
		]
		const load = jest.fn(() => []);
		const wrapper = shallow( <TableRow record={records} /> );
		
		const columns = wrapper.find('td');
		expect(columns.at(0).text()).toBe('col1');
		expect(columns.at(1).text()).toBe('1');
		expect(columns.at(2).text()).toBe('' + time);
	});
		
});