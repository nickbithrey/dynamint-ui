import React from 'react';
import { Link } from 'react-router-dom';
import SelectionComponent from '~/lib/SelectionComponent';

const initModel = {
	models: [
	    {col1: 'ref', col2: 'desc', col3: 'ACTIVE'},
	    {col1: 'ref2', col2: 'desc2', col3: 'ACTIVE'}
	]
}

export const ModelSelection = ({load, models = initModels}) => (
	<SelectionComponent 
		title={'Models'}
		list={models.models}
		loadList={load}
		columns={columns}
		createBtn={newBtn('/models/create', {}, 'Create')}
		editBtn={newBtn('/models/edit', {id: 1}, 'Edit')}
	/>
);

const columns = [
    {key: 'col1', name: 'Reference', fieldName: 'col1', minWidth: 50},
    {key: 'col2', name: 'Description', fieldName: 'col2', minWidth: 500},
    {key: 'col3', name: 'Status', fieldName: 'col3'}
];

const newBtn = (path, state, text) => {
	return {
		text: text,
		to: {
			pathname: path,
			state: state
		}
	};
}

export default ModelSelection;