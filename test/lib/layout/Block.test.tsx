import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Block } from 'lib/layout/Block';

const expectedTag = 'StackItem';

describe('<Block />', () => {
    
    const props = {
        tokens: {
            margin: 20,
            padding: 10
        }
    }

    it('renders valid tag and matches snapshot with default values', () => {
        const wrapper: ShallowWrapper = shallow(
            <Block {...props}>
                <p>test</p>
            </Block>
        );
        expect(wrapper).toMatchSnapshot();
    });
    
    it('will use default properties when not supplied', () => {
        const wrapper: ShallowWrapper = shallow(
            <Block {...props}>
                <p>test</p>
            </Block>
        );
        expect(wrapper.find(expectedTag).prop('shrink')).toEqual('initial');
        expect(wrapper.find(expectedTag).prop('align')).toEqual('auto');
        expect(wrapper.find(expectedTag).prop('disableShrink')).toBeFalsy();
        expect(wrapper.find(expectedTag).prop('verticalFill')).toBeTruthy();
    });
    
    it('will use overridden properties when supplied', () => {
        const wrapper: ShallowWrapper = shallow(
            <Block 
                shrink="inherit" 
                align="stretch" 
                disableShrink={true} 
                verticalFill={false} 
                {...props}>
                <p>test</p>
            </Block>
        );
        expect(wrapper.find(expectedTag).prop('shrink')).toEqual('inherit');
        expect(wrapper.find(expectedTag).prop('align')).toEqual('stretch');
        expect(wrapper.find(expectedTag).prop('disableShrink')).toBeTruthy();
        expect(wrapper.find(expectedTag).prop('verticalFill')).toBeFalsy();
    });
    
    it('will pass props to main item', () => {
        const wrapper: ShallowWrapper = shallow(
            <Block {...props}>
                <p>test</p>
            </Block>
        );
        expect(wrapper.find(expectedTag).prop('tokens')).toBe(props.tokens);
    });
    
    it('has default props set', () => {
        const wrapper: ShallowWrapper = shallow(
            <Block {...props}>
                <p>test</p>
            </Block>
        );
        const tag = wrapper.find(expectedTag);
        expect(tag.prop('align')).toBe('auto');
        expect(tag.prop('disableShrink')).toBeFalsy();
        expect(tag.prop('shrink')).toBe('initial');
        expect(tag.prop('verticalFill')).toBeTruthy();
    })
    
});