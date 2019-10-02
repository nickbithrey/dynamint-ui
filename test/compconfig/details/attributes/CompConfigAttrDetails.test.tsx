import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import CompConfigAttrDetails, { IDetails } from '~/compconfig/details/attributes/CompConfigAttrDetails';

describe('<CompConfigAttrDetails />', () => {
    
    const props: IDetails = {
        id: 'id',
        item: {
            name: 'val1',
            type: 'type',
            defaultValue: 'default'
        },
        update: jest.fn(),
        back: jest.fn()
    };

    let wrapper: ShallowWrapper;

    beforeEach(() => {
        wrapper = shallow(<CompConfigAttrDetails {...props} />);
    });
    
    it('renders a valid tag and matches snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });
    
});