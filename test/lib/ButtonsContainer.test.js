import React from 'react';
import { shallow } from 'enzyme';
import '@babel/polyfill';

import ButtonsContainer from '~/lib/ButtonsContainer';

describe('<ButtonsContainer /> rendering', () => {

	const props = {
		buttons: [
			{
				text: 'Btn1',
				onClick: jest.fn(),
				condition: () => true
			},
			{
				text: 'Btn2',
				onClick: jest.fn(),
				condition: () => true
			}
		]
	};
	
	let wrapper;
	
	beforeEach(() => {
		wrapper = shallow( <ButtonsContainer {...props} />);
	})
	
	it('can render standard buttons container', () => {
		expect(wrapper).toMatchSnapshot();
	});
	
	it('contains all buttons passed into props', () => {
		expect(wrapper.find('Button')).toHaveLength(props.buttons.length);
		props.buttons.forEach((b,i) => {
			Object.entries(b).forEach(([key,val]) => {
				expect(wrapper.find('Button').at(i).prop(key)).toBe(val);
			});
		});
	});
	
	it('renders children as well as button props', () => {
		const ButtonsContainerWithChildren = (
			<ButtonsContainer {...props}>
				<p>tag</p>
			</ButtonsContainer>
		);
		wrapper = shallow(ButtonsContainerWithChildren);
		expect(wrapper.find('Button')).toHaveLength(props.buttons.length);
		expect(wrapper.find('p')).toHaveLength(1);
	});
	
	it('renders children list as well as button props', () => {
		const ButtonsContainerWithChildren = (
			<ButtonsContainer {...props}>
				<p>tag</p>
				<p>tag2</p>
			</ButtonsContainer>
		);
		wrapper = shallow(ButtonsContainerWithChildren);
		expect(wrapper.find('Button')).toHaveLength(props.buttons.length);
		expect(wrapper.find('p')).toHaveLength(2);
		expect(wrapper.find('p').at(0).text()).toBe('tag');
		expect(wrapper.find('p').at(1).text()).toBe('tag2');
	});
		
});