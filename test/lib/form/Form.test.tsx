import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { Form, IForm } from 'lib/form/Form';

const FormContent = () => <p>form</p>;

describe('<Form />', () => {
   
    const props = {
        storageKey: 'key',
        entity: {
            reference: 'ref',
            desc: 'desc'
        },
        save: jest.fn(),
        back: jest.fn()
    };
    
    let wrapper: ShallowWrapper<Form>;
    
    beforeEach(() => {
        wrapper = shallow(<Form {...props}><FormContent /></Form>);
    });
    
    it('renders valid tag and matches snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });
    
    it('passes updateField prop to children', () => {
        expect(wrapper.find(FormContent).prop('update')).toBe((wrapper.instance() as Form).updateField);
    });
    
    it('will clear the window storage when unmounting', () => {
        const key = 'dynamint-ui-form-' + props.storageKey;
        window.localStorage.setItem(key, 'store');
        expect(window.localStorage.getItem(key)).toEqual('store');
        
        wrapper.unmount();
        
        expect(window.localStorage.getItem(key)).toBeNull();
    });
    
    it('will store the state to storage on update', () => {
        const key = 'dynamint-ui-form-' + props.storageKey;
        window.localStorage.removeItem(key);
        expect(window.localStorage.getItem(key)).toBeNull();
        wrapper.instance().componentDidUpdate({}, {});
        expect(window.localStorage.getItem(key)).not.toBeNull();
    });
    
    it('will initialise the storage on mount', () => {
        expect((wrapper.instance() as Form).storage).not.toBeNull();
    });
    
    it('sets the state on the update method', () => {
        expect(wrapper.state()).toEqual({
            reference: 'ref',
            desc: 'desc'
        });
        (wrapper.instance() as Form).updateField('name', 'value');
        expect(wrapper.state()).toEqual({
            reference: 'ref',
            desc: 'desc',
            name: 'value'
        });
    });
    
    it('calls save prop on save method', () => {
        const save: jest.MockedFunction<any> = props.save;
        expect(save.mock.calls).toHaveLength(0);
        (wrapper.instance() as Form).save();
        expect(save.mock.calls).toHaveLength(1);
        expect(save.mock.calls[0][0]).toEqual({
            reference: 'ref',
            desc: 'desc'
        });
    });
    
});
