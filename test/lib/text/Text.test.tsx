import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import Text, { IText } from 'lib/text/Text';

const expectedTag = 'Text';

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
