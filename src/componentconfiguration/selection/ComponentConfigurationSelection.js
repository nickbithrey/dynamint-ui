import React from 'react';
import SelectionComponent, { SelectionButton, alwaysShow, hasSelection } from '~/lib/SelectionComponent';

const columns = [
    {key: 'reference', name: 'Reference', fieldName: 'reference', minWidth: 50, maxWidth: 150},
    {key: 'componentType', name: 'Type', fieldName: 'componentType', maxWidth: 50},
    {key: 'description', name: 'Description', fieldName: 'description', minWidth: 500}
];

export const Selection = ({load, items, location, uri}) => (
	<SelectionComponent 
		title={'Component Configurations'}
		list={items}
		loadList={load}
		columns={columns}
		buttons={buildButtons(location.pathname, uri)}
	/>
);

const buildButtons = (pathname, uri) => (
	[
		new SelectionButton('Edit', pathname + '/edit', hasSelection, getUriFromSelection), 
		new SelectionButton('Create', pathname + '/create', alwaysShow, deets => ({ isCreate: true, uri: uri }))
	]
);

const getUriFromSelection = selectionDetails => {
	return {
		id: selectionDetails.getSelection()[0].reference,
		uri: selectionDetails.getSelection()[0].uri
	}
}

export default Selection;