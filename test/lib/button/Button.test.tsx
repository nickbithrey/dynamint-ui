import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import {
    Button,
    IButton
} from 'lib/button/Button';

const expectedButtonTags = {
    'primary': 'CustomizedPrimaryButton',
    'default': 'CustomizedDefaultButton',
    'command': 'CustomizedCommandBarButton',
    'icon': 'CustomizedIconButton',
}

describe('<Button />', () => {
    
    const props: IButton = {
        content: 'button name',
        onClick: jest.fn(),
        type: 'primary'
    }

    let wrapper: ShallowWrapper;
    
    beforeEach(() => {
        wrapper = shallow(<Button {...props} />);
    });
    
    it('renders valid tag and matches snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });
    
    it('renders link wrapper on button when link prop is supplied', () => {
        wrapper.setProps({link: 'link'});
        expect(wrapper).toMatchSnapshot();
    });
    
    it('renders correct type of button based on passed prop', () => {
        wrapper.setProps({type: 'primary'});
        expect(wrapper.find('CustomizedPrimaryButton')).toHaveLength(1);
        
        wrapper.setProps({type: 'default'});
        expect(wrapper.find('CustomizedDefaultButton')).toHaveLength(1);
        
        wrapper.setProps({type: 'command'});
        expect(wrapper.find('CustomizedCommandBarButton')).toHaveLength(1);
        
        wrapper.setProps({type: 'icon'});
        expect(wrapper.find('CustomizedIconButton')).toHaveLength(1);
        
        expect(() => wrapper.setProps({type: 'invalid'})).toThrowError();
        
    });
    
    it('passes onClick prop to button', () => {
        expect(wrapper.prop('onClick')).toBe(props.onClick);
    });
    
    it('will call onClick function on button click', () => {
        // this is integration test to ensure that clicking the button will render the correct button tag
        let onClick = props.onClick as jest.MockedFunction<any>;
        expect(onClick.mock.calls.length).toEqual(0);
        wrapper.find(expectedButtonTags.primary).simulate('click');
        expect(onClick.mock.calls.length).toEqual(1);
    });
    
});