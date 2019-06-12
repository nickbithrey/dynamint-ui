import React from 'react';
import { shallow } from 'enzyme';

import Table from '~/lib/Table';

const Record = props => (
	<tr>
		<td>{props.reference}</td>
		<td>{props.description}</td>
	</tr>
);

describe('<Table /> rendering', () => {

	it('can render standard table with records', () => {
		const list = [
			{reference:'ref', description: 'desc'},
			{reference:'ref2', description: 'desc2'}
		]
		const load = jest.fn(() => []);
		const wrapper = shallow( <Table list={list} load={load} tag={Record} /> );
		
		expect(wrapper).toMatchSnapshot();
		expect(wrapper.instance().props.load).not.toBeCalled();
	});
	
	it('can render empty table when no values passed into the list', () => {
		const load = jest.fn(() => []);
		const wrapper = shallow( <Table list={[]} load={load} tag={Record} /> );

		expect(wrapper.find(Record)).toHaveLength(0);
		expect(wrapper.instance().props.load).not.toBeCalled();
	});
		
	it('renders table with same number of records and in list', () => {
		const list = [
			{},
			{},
			{}
		]
		const load = jest.fn(() => []);
		const wrapper = shallow( <Table list={list} load={load} tag={Record} /> );
		
		expect(wrapper.find(Record)).toHaveLength(list.length);
		expect(wrapper.instance().props.load).not.toBeCalled();
	});
		
	it('calls load function when list is undefined on mount', () => {
		const load = jest.fn(() => []);
		const wrapper = shallow( <Table load={load} tag={Record} /> );
		
		expect(wrapper.instance().props.load).toBeCalled();
	});
		
	it('calls load function when list is undefined on update', () => {
		let list;
		const load = jest.fn(() => []);
		const wrapper = shallow( <Table list={[]} load={load} tag={Record} /> );

		// assert load not called already on mount (as list is defined)
		expect(wrapper.instance().props.load).not.toBeCalled();
		
		// update component
		wrapper.setProps({list: null});
		// assert load called on update
		expect(wrapper.instance().props.load).toBeCalled();
	});
		
});