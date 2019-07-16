import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import CompConfigSelection, { ICompConfigSelection } from '~/compconfig/selection/CompConfigSelection';

describe('<CompConfigSelection />', () => {
    
    const props: ICompConfigSelection = {
        id: 'id',
        items: [
            {col1: 'val1'},
            {col1: 'val2'},
        ],
        loading: false,
        columns: [
            {key: 'col1', name: 'col1', fieldName: 'col1', minWidth: 50, maxWidth: 100}
        ],
        updateSelected: jest.fn()
    };
    
    let wrapper: ShallowWrapper;

    beforeEach(() => {
        wrapper = shallow(<CompConfigSelection {...props} />);
    });
    
    it('renders a valid tag and matches snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });
    
});