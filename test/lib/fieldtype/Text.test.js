import React from 'react';
import { shallow } from 'enzyme';

import Text from '~/lib/fieldtype/Text';
import fieldTypes from '~/lib/fieldtype';

const tag = 'StyledTextFieldBase';

describe('<Text /> rendering', () => {

	let props = {
			label: 'label',
			name: 'name',
			value: 'value',
			readOnly: true,
			update: jest.fn(() => [])
	};
	
	let wrapper;
	
	beforeEach(() => {
		wrapper = shallow( <Text {...props} /> );
	})
	
	it('can render text field', () => {
		expect(wrapper).toMatchSnapshot();
	});
		
	it('calls update prop on blur', () => {
		const tagWrapper = wrapper.find(tag);
		expect(tagWrapper).toHaveLength(1);
		const event = {
			preventDefault: () => [],
			target: { value: 'newVal' }
		};
		expect(props.update.mock.calls).toHaveLength(0);
		tagWrapper.simulate('blur', event);
		expect(props.update.mock.calls).toHaveLength(1);
		expect(props.update.mock.calls[0][0]).toBe(event);
		expect(props.update.mock.calls[0][1]).toBe(event.target.value);
	});
		
	it('has default value of empty string', () => {
		props = {
			name: 'name',
			// value is undefined
			update: jest.fn(() => [])
		};
		wrapper = shallow( <Text {...props} /> );

		const tagWrapper = wrapper.find(tag);
		expect(tagWrapper).toHaveLength(1);
		expect(tagWrapper.prop('defaultValue')).toBe('');
	});
		
	it('passes through all additional props supplied', () => {
		props = {
			name: 'name',
			value: 'value',
			update: jest.fn(() => []),
			addProp1: 'p1',
			addProp2: 'p2',
			addProp3: 'p3'
		};
		wrapper = shallow( <Text {...props} /> );
		
		const tagWrapper = wrapper.find(tag);
		expect(tagWrapper).toHaveLength(1);
		expect(tagWrapper.props().addProp1).toBe('p1');
		expect(tagWrapper.props().addProp2).toBe('p2');
		expect(tagWrapper.props().addProp3).toBe('p3');
	});
		
	it('is exported from index.js', () => {
		expect(fieldTypes.text).toBe(Text);
	});

});