import * as React from 'react';
import { 
    shallow, 
    ShallowWrapper 
} from 'enzyme';
import {
    ButtonContainer,
    IButtonContainer
} from 'lib/button/ButtonContainer';
import {
    Button,
    IButton
} from 'lib/button/Button';

describe('<ButtonContainer />', () => {
    
    const props: IButtonContainer = {
        buttons: [
                  {key: 'button1', content: 'button1', onClick: jest.fn(), type: 'primary'},
                  {key: 'button2', content: 'button1', onClick: jest.fn(), type: 'default'}
              ]
    }
    
    let wrapper: ShallowWrapper;
    
    beforeEach(() => {
        wrapper = shallow(<ButtonContainer {...props} />);
    });
    
    it('renders a valid tag and matches snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });
    
    it('contains same number of buttons as supplied', () => {
        expect(wrapper.find('Button')).toHaveLength(props.buttons.length);
    });
    
    it('will not render anything if no buttons are supplied', () => {
        const emptyWrapper = shallow(<ButtonContainer {...{buttons: []}} />);
        expect(emptyWrapper.html()).toBeNull();
    });
    
    it('will throw error if buttons are not defined', () => {
        expect(() => shallow(<ButtonContainer {...{buttons: null}} />)).toThrowError();
        expect(() => shallow(<ButtonContainer {...{buttons: undefined}} />)).toThrowError();
    });
    
});