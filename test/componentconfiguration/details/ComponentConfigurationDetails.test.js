import React from 'react';
import { shallow } from 'enzyme';

import Details from '~/componentconfiguration/details/ComponentConfigurationDetails';
import { Selection as SelDetails } from 'office-ui-fabric-react/lib/DetailsList';

describe('<ComponentConfigurationDetails /> rendering', () => {

	let props = {
		load: jest.fn(() => []),
		record: {
			reference: 'reference',
			description: 'description',
			componentType: 'type',
			attributes: [
				{
					name: 'name',
					type: 'java.lang.Long'
				}
			],
		},
		fieldUpdate: jest.fn(() => []),
		update: jest.fn(() => []),
		location: {
			pathname: 'path',
			state: {
				uri: 'uri',
				isCreate: false
			}
		}
	};
	
	let wrapper;
	
	beforeEach(() => {
		wrapper = shallow( <Details {...props}/> );
	})
	
	it('matches snapshot', () => {
		expect(wrapper).toMatchSnapshot();
	});
	
	it('has all fields using fieldUpdate for update method', () => {
		wrapper.find('Field').forEach(f => {
			expect(f.prop('update')).toBe(props.fieldUpdate);
		});
		wrapper.find('ListField').forEach(f => {
			expect(f.prop('update')).toBe(props.fieldUpdate);
		});
	});
});