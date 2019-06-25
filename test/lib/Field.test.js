import React from 'react';
import { shallow } from 'enzyme';

import Field from '~/lib/Field';

const Record = props => (
	<tr>
		<td>{props.reference}</td>
		<td>{props.description}</td>
	</tr>
);

describe('<Field /> rendering', () => {

	it('can render text field', () => {
		const props = {
			name: 'name',
			value: 'value',
			update: jest.fn(() => []),
			checkbox: false
		};
		const wrapper = shallow( <Field {...props} /> );
		
		expect(wrapper).toMatchSnapshot();
	});
	
	it('can render checkbox field', () => {
		const props = {
			name: 'name',
			value: 'value',
			update: jest.fn(() => []),
			checkbox: true
		};
		const wrapper = shallow( <Field {...props} /> );
		
		expect(wrapper).toMatchSnapshot();
	});
		
	it('renders no Checkbox when no checkbox parameter passed', () => {
		const props = {
			name: 'name',
			value: 'value',
			update: jest.fn(() => [])
		};
		const wrapper = shallow( <Field {...props} /> );
		
		expect(wrapper.find('StyledCheckboxBase')).toHaveLength(0);
		expect(wrapper.find('StyledTextFieldBase')).toHaveLength(1);
	});
		
	it('updates state when changed', () => {
		const props = {
			name: 'name',
			value: 'value',
			update: jest.fn(() => [])
		};
		const wrapper = shallow( <Field {...props} /> );
		
		expect(wrapper.find('StyledTextFieldBase')).toHaveLength(1);
		const event = {
			preventDefault: () => [],
			target: { value: 'newVal' }
		};
		wrapper.find('StyledTextFieldBase').simulate('change', event);
		expect(wrapper.instance().props.update).not.toBeCalled();
		expect(wrapper.state('value')).toBe('newVal');
	});
		
	it('calls update function on unfocus of element (on blur)', () => {
		const props = {
			name: 'name',
			value: 'value',
			update: jest.fn(() => [])
		};
		const wrapper = shallow( <Field {...props} /> );
		
		expect(wrapper.find('StyledTextFieldBase')).toHaveLength(1);
		expect(wrapper.find('StyledTextFieldBase').prop())
		const event = {
			preventDefault: () => []
		};
		wrapper.find('StyledTextFieldBase').simulate('blur', event);
		expect(wrapper.instance().props.update).toBeCalled();
		expect(wrapper.instance().props.update.mock.calls.length).toBe(1);
		expect(wrapper.instance().props.update.mock.calls[0][0]).toEqual({'name': 'value'});
		expect(wrapper.instance().props.update.mock.calls[0][1]).toBe(event);
	});
		
	it('calls update with current version of state', () => {
		const props = {
			name: 'name',
			value: 'value',
			update: jest.fn(() => [])
		};
		const wrapper = shallow( <Field {...props} /> );
		
		wrapper.setState({value: 'newVal'});
		expect(wrapper.find('StyledTextFieldBase')).toHaveLength(1);
		const event = {
			preventDefault: () => []
		};
		wrapper.find('StyledTextFieldBase').simulate('blur', event);
		expect(wrapper.instance().props.update).toBeCalled();
		expect(wrapper.instance().props.update.mock.calls.length).toBe(1);
		expect(wrapper.instance().props.update.mock.calls[0][0]).toEqual({'name': 'newVal'});
		expect(wrapper.instance().props.update.mock.calls[0][1]).toBe(event);
	});
		
});