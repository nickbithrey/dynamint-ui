import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import CompConfigDetails, { IDetails } from '~/compconfig/details/CompConfigDetails';

describe('<CompConfigDetails />', () => {
    
    const props: IDetails = {
        id: 'id',
        item: {
            reference: 'val1',
            description: 'desc',
            componentType: 'type',
            _links: {
                attributes: {
                    href: 'href'
                }
            },
            uri: 'href'
        },
        update: jest.fn(),
        back: jest.fn()
    };

    let wrapper: ShallowWrapper;

    beforeEach(() => {
        wrapper = shallow(<CompConfigDetails {...props} />);
    });
    
    it('renders a valid tag and matches snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });
    
});