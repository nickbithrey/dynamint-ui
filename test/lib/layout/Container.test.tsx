import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import {
    Container,
    IContainer
} from 'lib/layout/Container';

describe('<Container />', () => {
    
    const props: IContainer = {
        tokens: {
            childrenGap: 2,
            maxHeight: 20
        },
        styles: {
            inner: {}
        }
    }

    it('will render valid tag and matches snapshot', () => {
        const wrapper: ShallowWrapper = shallow(
            <Container {...props}>
                <p>test</p>
            </Container>
        );
        expect(wrapper).toMatchSnapshot();
    });
    
    it('will render null when no children are passed in', () => {
        const wrapper: ShallowWrapper = shallow(
            <Container {...props} />
        );
        expect(wrapper.html()).toBeNull();
    });
    
});