import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import {
    withUrlMatcher,
    IUrlMatcher,
    IUrlParam
} from 'lib/urlmatcher/urlmatcher';

const SubComp = () => <span />

describe('withUrlMatcher component', () => {
    
    it('renders loading tag when loading and calls load function', () => {
        const Component = withUrlMatcher(SubComp);
        const props = {
             customProp1: '',
             customProp2: 2,
             match: {
                 params: {
                     id: 1
                 }
             }
        }
        const wrapper = shallow(<Component {...props} />);
        
        expect(wrapper.find(SubComp)).toHaveLength(1);
        expect(wrapper.find(SubComp).prop('id')).toEqual(props.match.params.id);
        expect(wrapper.find(SubComp).prop('customProp1')).toEqual(props.customProp1);
        expect(wrapper.find(SubComp).prop('customProp2')).toEqual(props.customProp2);
    });
    
});
