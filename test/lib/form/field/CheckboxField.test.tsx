import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { ITypedField } from 'lib/form/field/Field';
import { CheckboxField } from 'lib/form/field/CheckboxField';

describe('<CompConfigAttrDetails />', () => {
    
    const props: ITypedField<boolean> = {
        name: 'name',
        label: 'label',
        value: true,
        update: jest.fn(),
        entity: {},
    };

    let wrapper: ShallowWrapper;

    beforeEach(() => {
        wrapper = shallow(<CheckboxField {...props} />);
    });
    
    it('renders a valid tag and matches snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });
    
});