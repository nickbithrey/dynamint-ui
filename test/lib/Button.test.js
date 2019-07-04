import React from 'react';
import { shallow } from 'enzyme';

import Button, { newBtn, newPrimaryBtn } from '~/lib/Button';

const buttonTagName = 'CustomizedDefaultButton';

describe('<Button /> rendering', () => {

	it('can render standard button', () => {
		const props = {
			text: 'name',
			onClick: jest.fn(() => [])
		};
		const wrapper = shallow( <Button {...props} /> );
		
		expect(wrapper).toMatchSnapshot();
	});
	
	it('calls onClick function on when clicking', () => {
		const props = {
			text: 'name',
			onClick: jest.fn(() => [])
		};
		const wrapper = shallow( <Button {...props} /> );
		
		expect(wrapper.find(buttonTagName)).toHaveLength(1);
		expect(wrapper.find(buttonTagName).prop())
		wrapper.find(buttonTagName).simulate('click');
		console.log(wrapper.props);
		expect(wrapper.prop('onClick')).toBeCalled();
		expect(wrapper.prop('onClick').mock.calls.length).toBe(1);
	});
		
});
	
describe('functions for creating buttons', () => {
	
	test('new standard button function', () => {
		const name = 'name';
		const click = jest.fn();
		const condition = jest.fn();
		
		const btn = newBtn(name, click, condition);
		
		expect(btn.text).toBe(name);
		expect(btn.onClick).toBe(click);
		expect(btn.condition).toBe(condition);
		expect(btn.type).toBe('standard');
	});
	
	test('new primary button function', () => {
		const name = 'name';
		const click = jest.fn();
		const condition = jest.fn();
		
		const btn = newPrimaryBtn(name, click, condition);
		
		expect(btn.text).toBe(name);
		expect(btn.onClick).toBe(click);
		expect(btn.condition).toBe(condition);
		expect(btn.type).toBe('primary');
	});

});