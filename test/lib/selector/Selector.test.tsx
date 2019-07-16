import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { ISelection, SelectionMode, Selection } from 'office-ui-fabric-react/lib/Selection';

import {
    ISelector,
    Selector,
    ISelectionButton,
    ISelectionDetails,
    SelectionType,
    ISelectorState
} from 'lib/selector/Selector';

const SubComp = () => <p>text</p>;

describe('selector', () => {
    
    const props: ISelector = {
        storeKey: 'store-key',
        loading: false,
        items: [
            {key: 'i1', selected: false},
            {key: 'i2', selected: false},
            {key: 'i3', selected: false}
        ],
        columns: [
            {name: 'col1', key: 'col1', fieldName: 'col1', minWidth: 50},
            {name: 'col2', key: 'col2', fieldName: 'col2', minWidth: 100}
        ],
        buttons: [
            {
                button: {
                    key: 'standard',
                    content: 'Standard', 
                    type: 'primary', 
                    onClick: jest.fn(), 
                    link: 'link'
                },
                condition: () => true
            },
            {
                button: {
                    key: 'standard',
                    content: 'Link Resolver', 
                    type: 'primary', 
                    onClick: jest.fn(), 
                    link: 'link'
                },
                linkResolver: (selectionDetails: ISelectionDetails) => 'updatedLink',
                condition: () => true
            },
            {
                button: {
                    key: 'standard',
                    content: 'onClick Resolver', 
                    type: 'primary', 
                    onClick: jest.fn(), 
                    link: 'link'
                },
                onClickResolver: (selectionDetails: ISelectionDetails) => jest.fn(),
                condition: () => true
            }
        ],
        selectionType: SelectionType.single
    };

    let wrapper: ShallowWrapper;

    beforeEach(() => {
        wrapper = shallow(<Selector {...props} />);
    });
    
    it('will render a valid tag and matches snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });
    
    it('initialised the state correctly', () => {
        expect(wrapper.state()).toEqual({
            selectionDetails: {
                selectedCount: 0,
                selected: [],
                selectedIndices: []
            }
        });
    });
    
    it('updates the state on selection change', () => {
        const indexToSelect = 0;
        const selection: ISelection = wrapper.find('Table').prop('selection');
        selection.setItems(props.items, true);

        selection.toggleIndexSelected(indexToSelect);

        expect(wrapper.instance().state).toEqual({
            selectionDetails: {
                selectedCount: 1,
                selected: [props.items[indexToSelect]],
                selectedIndices: [indexToSelect]
            }
        });
        const key = 'dynamint-ui-selector-' + props.storeKey;
        expect(JSON.parse(window.localStorage.getItem(key))).toEqual({
            selectionDetails: {
                selectedCount: 1,
                selected: [props.items[indexToSelect]],
                selectedIndices: [indexToSelect]
            }
        });
    });
    
    it('will clear the window storage when unmounting', () => {
        const key = 'dynamint-ui-selector-' + props.storeKey;
        window.localStorage.setItem(key, 'store');
        expect(window.localStorage.getItem(key)).toEqual('store');
        
        wrapper.unmount();
        
        expect(window.localStorage.getItem(key)).toBeNull();
    });
    
    it('will store the state to storage on update', () => {
        const key = 'dynamint-ui-selector-' + props.storeKey;
        window.localStorage.removeItem(key);
        expect(window.localStorage.getItem(key)).toBeNull();
        wrapper.instance().componentDidUpdate({}, {});
        expect(window.localStorage.getItem(key)).not.toBeNull();
    });

});
