import React from 'react';
import { shallow } from 'enzyme';

import detailsComponent from '~/lib/DetailsComponent';

const Tag = () => <p>tag</p>

describe('detailsComponent Higher Order Component rendering', () => {

	const props = {
		location: {
			state: {
				uri: 'uri',
				id: 'id',
				isCreate: false
			}
		},
		load: jest.fn(() => []),
		clear: jest.fn(() => []),
		update: jest.fn(() => []),
		updateField: jest.fn(() => []),
		loading: false,
		record: {
			reference: 'reference',
			description: 'desc'
		},
		history: {
			goBack: jest.fn(() => [])
		},
		title: 'title',
		uri: 'top-uri'
	};
	
	const Container = detailsComponent(Tag);
	
	let wrapper;
	
	beforeEach(() => {
		props.load.mockReset();
		props.clear.mockReset();
		props.history.goBack.mockReset();
		wrapper = shallow( <Container {...props} />);
	})
	
	it('matches snapshot', () => {
		expect(wrapper).toMatchSnapshot();
	});
		
	it('calls load prop on mount', () => {
		expect(props.load.mock.calls).toHaveLength(1);
	});
	
	it('calls clear prop on mount', () => {
		wrapper.unmount();
		expect(props.clear.mock.calls).toHaveLength(1);
	});
	
	it('renders Loading when loading details', () => {
		expect(wrapper.find('Loading')).toHaveLength(0);
		
		const loadingProps = {...props, loading: true};
		wrapper = shallow( <Container {...loadingProps} /> );
		
		expect(wrapper.find('Loading')).toHaveLength(1);
	});
		
	it('has Save button details correct', () => {
		expect(wrapper.find('ButtonsContainer')).toHaveLength(1);
		expect(wrapper.find('ButtonsContainer').prop('buttons')[0].text).toBe('Save');
		expect(wrapper.find('ButtonsContainer').prop('buttons')[0].onClick).toBe(wrapper.instance().handleUpdate);
		expect(wrapper.find('ButtonsContainer').prop('buttons')[0].condition()).toBe(true);
		expect(wrapper.find('ButtonsContainer').prop('buttons')[0].type).toBe('primary');
	});
	
	it('update function calls update prop with correct details', () => {
		expect(props.update.mock.calls).toHaveLength(0);
		const event = {
			preventDefault: () => []
		};
		wrapper.instance().handleUpdate(event);
		expect(props.update.mock.calls).toHaveLength(1);
		expect(props.update.mock.calls[0][0]).toBe(props.record);
		expect(props.update.mock.calls[0][1]).toBe(props.location.state.uri);
		expect(props.update.mock.calls[0][2]).toBe(props.location.state.isCreate);
	});
	
	it('has Back button details correct', () => {
		expect(wrapper.find('ButtonsContainer')).toHaveLength(1);
		expect(wrapper.find('ButtonsContainer').prop('buttons')[1].text).toBe('Back');
		expect(wrapper.find('ButtonsContainer').prop('buttons')[1].onClick).toBe(wrapper.instance().back);
		expect(wrapper.find('ButtonsContainer').prop('buttons')[1].condition()).toBe(true);
		expect(wrapper.find('ButtonsContainer').prop('buttons')[1].type).toBe('standard');
	});
	
	it('calls history back on back method', () => {
		expect(props.history.goBack.mock.calls).toHaveLength(0);
		wrapper.instance().back();
		expect(props.history.goBack.mock.calls).toHaveLength(1);
	});
	
	it('updateField function calls update prop with correct details', () => {
		expect(props.updateField.mock.calls).toHaveLength(0);
		const field = {
		}
		wrapper.instance().handleUpdateField(field);
		expect(props.updateField.mock.calls).toHaveLength(1);
		expect(props.updateField.mock.calls[0][0]).toBe(field);
	});
	
});