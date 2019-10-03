import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import Text from 'lib/text/Text';

describe('<Text />', () => {
   
    const props = {
        className: 'classname'
    }
    
    const content = 'this is the content';
    
    let wrapper: ShallowWrapper;
    
    beforeEach(() => {
        wrapper = shallow(<Text {...props}>{content}</Text>);
    })
    
    it('renders valid tag and matches snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });
    
});
