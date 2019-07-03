import React from 'react';
import { shallow } from 'enzyme';

import ListField, { listUpdate } from '~/lib/ListField';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';

const Tag = () => <p>Tag</p>;

describe('<ListField /> rendering', () => {
	
	const props = {
		name: "name",
		label: "Label",
		value: [
			{field1: 'val11', field2: 'val12'},
			{field1: 'val21', field2: 'val22'}
		],
		update: jest.fn(() => []),
		tag: Tag,
		columns: [
			{key: 'field1', name: 'Field 1', fieldName: 'field1'},
			{key: 'field2', name: 'Field 2', fieldName: 'field2'}
		],
		newElement: {field1: 'val31', field2: 'val32'}
	};
	
	let wrapper;
	
	beforeEach(() => {
		wrapper = shallow( <ListField {...props} /> );
	})

	it('matches snapshot', () => {
		expect(wrapper).toMatchSnapshot();
	});
	
	it('adds new element prop to value on Add button click and calls update prop function', () => {
		expect(props.update.mock.calls).toHaveLength(0);
		const event = {
			preventDefault: () => []
		}
		wrapper.find('Button').simulate('click', event);
		expect(props.update.mock.calls).toHaveLength(1);
		expect(props.update.mock.calls[0][0]).toEqual({name: props.name, value: [...props.value, props.newElement]});
	});
	
	it('doesn\'t render details of row when unselected', () => {
		const rowProps = {
			selection: wrapper.find('StyledWithViewportComponent').props().selection,
			itemIndex: 1
		};
		const fieldUpdate = jest.fn(() => []);
		expect(wrapper.instance().renderRow(fieldUpdate, Tag)(rowProps)).toMatchSnapshot();
	});
		
	it('renders details of row when selected', () => {
		const rowProps = {
			selection: wrapper.find('StyledWithViewportComponent').props().selection,
			itemIndex: 1
		};
		const fieldUpdate = jest.fn(() => []);
		
		// call selection changed event
		const selection = wrapper.find('StyledWithViewportComponent').props().selection;
		selection._items = props.value;
		selection.toggleIndexSelected(1);
		selection._onSelectionChanged();
		
		expect(wrapper.instance().renderRow(fieldUpdate, Tag)(rowProps)).toMatchSnapshot();
	});
	
	it('passes update prop to selected row', () => {
		const rowProps = {
			selection: wrapper.find('StyledWithViewportComponent').props().selection,
			itemIndex: 1
		};
		const fieldUpdate = jest.fn(() => []);
		
		// call selection changed event
		const selection = wrapper.find('StyledWithViewportComponent').props().selection;
		selection._items = props.value;
		selection.toggleIndexSelected(1);
		selection._onSelectionChanged();
		
		const rowWrapper = shallow(wrapper.instance().renderRow(fieldUpdate, Tag)(rowProps));
		expect(rowWrapper.find('ListUpdate').prop('fieldUpdate')).toBe(fieldUpdate);
	});
	
	it('renders correct column details', () => {
		const item = {field1: 'val11', field2: 'val12', field3: true};
		const textColumn = {key: 'field2', name: 'Field 2', fieldName: 'field2'};
		const boolColumn = {key: 'field3', name: 'Field 3', fieldName: 'field3', type: 'boolean'};

		expect(wrapper.instance().renderColumn(item, 1, textColumn)).toEqual(<span>val12</span>);
		expect(wrapper.instance().renderColumn(item, 1, boolColumn)).toEqual(<span><Checkbox checked={true} /></span>);
	});
	
	it('sets defaults correctly', () => {
		const propsLessDefaults = {...props};
		Object.keys(ListField.defaultProps).forEach(k => {
			delete propsLessDefaults[k];
		});
		wrapper = shallow( <ListField {...propsLessDefaults} /> );
		
		Object.entries(ListField.defaultProps).forEach(([key,value]) => {
			expect(wrapper.instance().props[key]).toBe(value);
		});
		
	});
	
});
	
describe('<ListUpdate /> rendering', () => {
	
	const props = {
		fieldUpdate: jest.fn(() => []),
		itemIndex: 1,
		selection: {}
	};
	
	let wrapper;
	
	beforeEach(() => {
		const Component = listUpdate(Tag);
		wrapper = shallow(<Component {...props} />);
	})

	it('matches snapshot', () => {
		expect(wrapper).toMatchSnapshot();
	});
		
	it('calls update prop function on submit button click', () => {
		expect(props.fieldUpdate.mock.calls).toHaveLength(0);
		const event = {
			preventDefault: () => []
		}
		const state = {key: 'val'};
		wrapper.setState(state);
		wrapper.find('Button').simulate('click', event);
		expect(props.fieldUpdate.mock.calls).toHaveLength(1);
		expect(props.fieldUpdate.mock.calls[0][0]).toEqual(state);
		expect(props.fieldUpdate.mock.calls[0][1]).toBe(props.itemIndex);
	});
	
});
	
