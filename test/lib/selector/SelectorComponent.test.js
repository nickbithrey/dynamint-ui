import React from 'react';
import { shallow } from 'enzyme';

import SelectorComponent from '~/lib/selector/SelectorComponent';
import SelectionButton from '~/lib/selector/SelectionButton';

describe('<SelectionComponent /> rendering', () => {

	const props = {
		title: 'titleText',
		items: [],
		load: jest.fn(() => []),
		columns: [],
		location: {
			pathname: 'path'
		}
	};
	
	let wrapper;
	
	beforeEach(() => {
		wrapper = shallow( <SelectorComponent {...props} /> );
	});

	it('can render standard component with records', () => {
		expect(wrapper).toMatchSnapshot();
	});
		
	it('only renders buttons that have true conditions', () => {
		const newProps = {
			...props,
			buttons: [
				new SelectionButton('Edit', 'path', jest.fn(sel => false), jest.fn(() => {return {}})), 
				new SelectionButton('Create', 'path', jest.fn(sel => true), jest.fn(() => {return {}}))
			],
			includeDefaultButtons: false
		};
		const wrapper = shallow( <SelectorComponent {...newProps} /> );

		const btn = wrapper.find('SelectorButtons');
		expect(btn.length).toBe(1);
		expect(btn.prop('buttons')).toHaveLength(2);
		expect(btn.prop('buttons')[0]).toBe(newProps.buttons[0]);
		expect(btn.prop('buttons')[1]).toBe(newProps.buttons[1]);
	});
	
	it('renders nothing for when no title is supplied', () => {
		let title = wrapper.find('SelectorTitle');
		expect(title).toHaveLength(1);
		expect(title.prop('title')).toBe(props.title);
		
		wrapper.setProps({title: null});
		
		title = wrapper.find('SelectorTitle');
		expect(title).toHaveLength(1);
		expect(title.prop('title')).toBeNull();
	});
		
	it('renders table with details', () => {
		const newProps = {
			...props,
			items: [
				{text: 'val1', num: 1},
				{text: 'val2', num: 2}
			],
			columns: [
				{fieldName: 'text', name: 'Text'},
				{fieldName: 'num', name: 'Number'}
			]
		};
		const wrapper = shallow( <SelectorComponent {...newProps} /> );

		let table = wrapper.find('SelectorTable');
		expect(table.length).toBe(1);
		expect(table.prop('items')).toBe(newProps.items);
		expect(table.prop('load')).toBe(newProps.load);
		expect(table.prop('columns')).toBe(newProps.columns);
	});
	
	it('re-runs button condition when selecting record in table', () => {
		const newProps = {
			...props,
			items: [
				{text: 'val1', num: 1},
				{text: 'val2', num: 2}
			],
			columns: [
				{fieldName: 'text', name: 'Text'},
				{fieldName: 'num', name: 'Number'}
			],
			buttons: [
				new SelectionButton('Edit', 'path', jest.fn(sel => sel.getSelectedCount() > 0), jest.fn(() => {return {}})), 
				new SelectionButton('Create', 'path', jest.fn(sel => true), jest.fn(() => {return {}}))
			],
			includeDefaultButtons: false
		};
		const wrapper = shallow( <SelectorComponent {...newProps} /> );

		let btn = wrapper.find('SelectorButtons');
		expect(btn.prop('selection').getSelectedCount()).toBe(0);

		// call selection changed event
		const selection = btn.prop('selection');
		selection._items = newProps.items;
		selection.setIndexSelected(1, true, true);
		selection._onSelectionChanged();

		btn = wrapper.find('SelectorButtons');
		expect(btn.prop('selection').getSelectedCount()).toBe(1);
	});
	
});