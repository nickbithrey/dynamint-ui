import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { ITypedField } from 'lib/form/field/Field';
import { TextField } from 'lib/form/field/TextField';

describe('<CompConfigAttrDetails />', () => {
    
    const props: ITypedField<string> = {
        name: 'name',
        label: 'label',
        value: 'value',
        update: jest.fn(),
        entity: {},
    };

    let wrapper: ShallowWrapper;

    beforeEach(() => {
        wrapper = shallow(<TextField {...props} />);
    });
    
    it('renders a valid tag and matches snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });
    
});