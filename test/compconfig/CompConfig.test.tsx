import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import CompConfig from '~/compconfig/CompConfig';

describe('<CompConfig />', () => {
    
    let wrapper: ShallowWrapper;

    beforeEach(() => {
        wrapper = shallow(<CompConfig />);
    });
    
    it('renders a valid tag and matches snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });
    
});