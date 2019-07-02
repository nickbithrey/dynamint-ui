import React from 'react';
import { shallow } from 'enzyme';

import Selection from '~/componentconfiguration/selection/ComponentConfigurationSelection';
import { Selection as SelDetails } from 'office-ui-fabric-react/lib/DetailsList';

describe('<ComponentConfigurationSelection /> rendering', () => {

	let props = {
		load: jest.fn(() => []),
		items: [],
		location: { pathname: 'compconfigs'},
		uri: 'uri'
	};
	
	let wrapper;
	
	beforeEach(() => {
		wrapper = shallow( <Selection {...props}/> );
	})
	
	it('matches snapshot', () => {
		expect(wrapper).toMatchSnapshot();
	});
		
	test('resolving selected record from selection details', () => {
		const selDetails = new SelDetails();
		selDetails._items = [{reference: 'ref', uri: 'uri'}];
		selDetails.setIndexSelected(1, true, true);
		const state = wrapper.find('SelectionComponent').prop('buttons')[0].stateFn(selDetails);
		expect(state).toEqual({id: 'ref', uri: 'uri'});
	});
	
	it('will only show edit button when record is selected', () => {
		const selDetails = new SelDetails();
		const editBtn = wrapper.find('SelectionComponent').prop('buttons')[0];
		let condition = editBtn.condition(selDetails);
		expect(condition).toBeFalsy();
		
		selDetails._items = [{reference: 'ref', uri: 'uri'}];
		selDetails.setIndexSelected(1, true, true);
		condition = editBtn.condition(selDetails);
		expect(condition).toBeTruthy();
	});
	
	it('will always show create button', () => {
		const selDetails = new SelDetails();
		const createBtn = wrapper.find('SelectionComponent').prop('buttons')[1];
		let condition = createBtn.condition(selDetails);
		expect(condition).toBeTruthy();
		
		selDetails._items = [{reference: 'ref', uri: 'uri'}];
		selDetails.setIndexSelected(1, true, true);
		condition = createBtn.condition(selDetails);
		expect(condition).toBeTruthy();
	});
	
});