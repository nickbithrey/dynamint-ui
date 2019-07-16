import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import {
    withLoading,
    ILoading
} from 'lib/loading/loading';

const SubComp = () => <span />

describe('withLoading component', () => {
    
    it('renders loading tag when loading and calls load function', () => {
        const Component = withLoading(SubComp);
        const props = {
            id: '',
            loading: true,
            load: jest.fn()
        }
        const load = props.load as jest.MockedFunction<any>;
        expect(load.mock.calls.length).toEqual(0);
        const wrapper = shallow(<Component {...props} />);
        
        expect(wrapper.find(SubComp)).toHaveLength(0);
        expect(load.mock.calls.length).toEqual(1);
    });
    
    it('renders sub component tag when not loading and doesnt call load function', () => {
        const Component = withLoading(SubComp);
        const props = {
            id: '',
            loading: false,
            load: jest.fn()
        }
        const load = props.load as jest.MockedFunction<any>;
        expect(load.mock.calls.length).toEqual(0);
        const wrapper = shallow(<Component {...props} />);
        
        expect(wrapper.find(SubComp)).toHaveLength(1);
        expect(load.mock.calls.length).toEqual(0);
    });
    
});
