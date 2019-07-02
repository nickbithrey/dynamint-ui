import React from 'react';
import { shallow } from 'enzyme';

import Field from '~/lib/Field';
import fieldTypes from '~/lib/fieldtype';

describe('<Field /> rendering', () => {
	
	it('will render all different field types', () => {
		const props = {
			name: 'name',
			update: jest.fn(() => [])
		};
		
		expect(Object.keys(fieldTypes)).not.toHaveLength(0);
		Object.entries(fieldTypes).forEach(([key,value]) => {
			props.type = key;
			
			const wrapper = shallow( <Field {...props} /> );
			const child = wrapper.find(value);
			expect(child).toHaveLength(1);
			expect(child.children()).toHaveLength(0);
			Object.values(fieldTypes)
				.filter(v => v !== value)
				.forEach(v => {
					expect(wrapper.find(v)).toHaveLength(0);
				});
		});
	});
		
	it('has default field type of text', () => {
		const props = {
			name: 'name',
			value: 'value',
			update: jest.fn(() => [])
			// no type field
		};
		const wrapper = shallow( <Field {...props} /> );
		
		expect(wrapper.find('Text')).toHaveLength(1);
	});
		
	test('update function will update based on the props', () => {
		const props = {
			name: 'name',
			value: 'value',
			update: jest.fn(() => [])
		};
		const wrapper = shallow( <Field {...props} /> );

		expect(wrapper.instance().props.update).not.toBeCalled();
		wrapper.instance().update();
		expect(wrapper.instance().props.update).toBeCalled();
	});
		
});