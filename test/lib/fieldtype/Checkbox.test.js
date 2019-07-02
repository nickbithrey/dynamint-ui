import React from 'react';
import { shallow } from 'enzyme';

import Checkbox from '~/lib/fieldtype/Checkbox';
import fieldTypes from '~/lib/fieldtype';

const tag = 'StyledCheckboxBase';

describe('<Checkbox /> rendering', () => {

	let props = {
			label: 'label',
			name: 'name',
			value: true,
			readOnly: true,
			update: jest.fn(() => [])
	};
	
	let wrapper;
	
	beforeEach(() => {
		wrapper = shallow( <Checkbox {...props} /> );
	})
	
	it('can render text field', () => {
		expect(wrapper).toMatchSnapshot();
	});
		
	it('calls update prop on change', () => {
		const tagWrapper = wrapper.find(tag);
		expect(tagWrapper).toHaveLength(1);
		const event = {
			preventDefault: () => [],
			target: { value: false }
		};
		expect(props.update.mock.calls).toHaveLength(0);
		tagWrapper.simulate('change', event);
		expect(props.update.mock.calls).toHaveLength(1);
		expect(props.update.mock.calls[0][0]).toBe(event);
	});
		
	it('has default value of false', () => {
		props = {
			name: 'name',
			// value is undefined
			update: jest.fn(() => [])
		};
		wrapper = shallow( <Checkbox {...props} /> );

		const tagWrapper = wrapper.find(tag);
		expect(tagWrapper).toHaveLength(1);
		expect(tagWrapper.prop('checked')).toBe(false);
	});
		
	it('passes through all additional props supplied', () => {
		props = {
			...props,
			addProp1: 'p1',
			addProp2: 'p2',
			addProp3: 'p3'
		};
		wrapper = shallow( <Checkbox {...props} /> );
		
		const tagWrapper = wrapper.find(tag);
		expect(tagWrapper).toHaveLength(1);
		expect(tagWrapper.props().addProp1).toBe('p1');
		expect(tagWrapper.props().addProp2).toBe('p2');
		expect(tagWrapper.props().addProp3).toBe('p3');
	});
		
	it('is exported from index.js', () => {
		expect(fieldTypes.check).toBe(Checkbox);
	});

});