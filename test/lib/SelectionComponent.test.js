import React from 'react';
import { shallow } from 'enzyme';

import SelectionComponent, { SelectionButton } from '~/lib/SelectionComponent';

describe('<SelectionComponent /> rendering', () => {

	it('can render standard component with records', () => {
		const props = {
			title: 'titleText',
			list: [],
			loadList: jest.fn(() => []),
			columns: [],
			buttons: [
					new SelectionButton('Edit', 'path', jest.fn(sel => true), jest.fn(sel => {return {}})), 
					new SelectionButton('Create', 'path', jest.fn(sel => true), jest.fn(sel => {return {}}))
				]
		};
		const wrapper = shallow( <SelectionComponent {...props} /> );
		
		expect(wrapper).toMatchSnapshot();
	});
		
	it('only renders buttons that have true conditions', () => {
		const props = {
			title: 'titleText',
			list: [],
			loadList: jest.fn(() => []),
			columns: [],
			buttons: [
					new SelectionButton('Edit', 'path', jest.fn(sel => false), jest.fn(() => {return {}})), 
					new SelectionButton('Create', 'path', jest.fn(sel => true), jest.fn(() => {return {}}))
				]
		};
		const wrapper = shallow( <SelectionComponent {...props} /> );

		const btn = wrapper.find('Button');
		expect(btn.length).toBe(1);
		expect(btn.prop('text')).toBe('Create');
		expect(props.buttons[0].condition.mock.calls).toHaveLength(1);
		expect(props.buttons[0].stateFn.mock.calls).toHaveLength(0);
		expect(props.buttons[1].condition.mock.calls).toHaveLength(1);
		expect(props.buttons[1].stateFn.mock.calls).toHaveLength(1);
	});
	
	it('renders nothing for when no title is supplied', () => {
		const props = {
			title: 'titleText',
			list: [],
			loadList: jest.fn(() => []),
			columns: [],
			buttons: [
					new SelectionButton('Edit', 'path', jest.fn(sel => true), jest.fn(() => {return {}})), 
					new SelectionButton('Create', 'path', jest.fn(sel => true), jest.fn(() => {return {}}))
				]
		};
		const wrapper = shallow( <SelectionComponent {...props} /> );

		let title = wrapper.find('h1');
		expect(title.length).toBe(1);
		expect(title.text()).toBe(props.title);
		
		wrapper.setProps({title: null});
		
		title = wrapper.find('h1');
		expect(title.length).toBe(0);
	});
		
	it('renders table with details', () => {
		const props = {
			title: 'titleText',
			list: [
					{text: 'val1', num: 1},
					{text: 'val2', num: 2}
				],
			loadList: jest.fn(() => []),
			columns: [
					{fieldName: 'text', name: 'Text'},
					{fieldName: 'num', name: 'Number'}
				],
			buttons: [
					new SelectionButton('Edit', 'path', jest.fn(sel => true), jest.fn(() => {return {}})), 
					new SelectionButton('Create', 'path', jest.fn(sel => true), jest.fn(() => {return {}}))
				]
		};
		const wrapper = shallow( <SelectionComponent {...props} /> );

		let table = wrapper.find('Table');
		expect(table.length).toBe(1);
		expect(table.prop('list')).toBe(props.list);
		expect(table.prop('load')).toBe(props.loadList);
		expect(table.prop('columns')).toBe(props.columns);
	});
	
	it('re-runs button condition when selecting record in table', () => {
		const props = {
			title: 'titleText',
			list: [
					{text: 'val1', num: 1},
					{text: 'val2', num: 2}
				],
			loadList: jest.fn(() => []),
			columns: [
					{fieldName: 'text', name: 'Text'},
					{fieldName: 'num', name: 'Number'}
				],
			buttons: [
					new SelectionButton('Edit', 'path', jest.fn(sel => sel.getSelectedCount() > 0), jest.fn(() => {return {}})), 
					new SelectionButton('Create', 'path', jest.fn(sel => true), jest.fn(() => {return {}}))
				]
		};
		const wrapper = shallow( <SelectionComponent {...props} /> );

		let btn = wrapper.find('Button');
		expect(btn.length).toBe(1);
		expect(btn.prop('text')).toBe('Create');

		// call selection changed event
		const selection = wrapper.find('StyledMarqueeSelectionBase').props().selection;
		selection._items = props.list;
		selection.setIndexSelected(1, true, true);
		selection._onSelectionChanged();
		
		btn = wrapper.find('Button');
		expect(btn.length).toBe(2);
		expect(btn.at(0).prop('text')).toBe('Edit');
		expect(btn.at(1).prop('text')).toBe('Create');
	});
	
});