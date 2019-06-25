import React from 'react';
import { shallow } from 'enzyme';

import Button from '~/lib/Button';

const buttonTagName = 'CustomizedPrimaryButton';

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