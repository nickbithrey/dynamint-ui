import React from 'react';
import SelectionComponent from '~/lib/SelectionComponent';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';

const initModel = {
	models: [
	    {reference: 'ref', description: 'desc', status: 'ACTIVE', uri: 'uri1'},
	    {reference: 'ref2', description: 'desc2', status: 'ACTIVE', uri: 'uri2'}
	]
}

const classNames = mergeStyleSets({
  hidden: {
    selectors: {
      '&:before': {
    	  width: '0px',
    	  visibility: 'hidden'
      }
    }
  }
});


const columns = [
    {key: 'reference', name: 'Reference', fieldName: 'reference', minWidth: 50, maxWidth: 150},
    {key: 'componentType', name: 'Type', fieldName: 'componentType', maxWidth: 50},
    {key: 'description', name: 'Description', fieldName: 'description', minWidth: 500}
];

export const ModelSelection = ({load, models = initModels}) => (
	<SelectionComponent 
		title={'Models'}
		list={models.models}
		loadList={load}
		columns={columns}
		createBtn={newBtn('/models/create', () => {}, 'Create')}
		editBtn={{...newBtn('/models/edit', getUriFromSelection, 'Edit'), condition: selectionDetails => selectionDetails.getSelectedCount() > 0}}
	/>
);

const newBtn = (path, stateFn, text) => {
	return {
		text: text,
		pathname: path,
		stateFn: stateFn,
		condition: selectionDetails => true
	};
}

const getUriFromSelection = selectionDetails => {
	return {
		id: selectionDetails.getSelection()[0].reference,
		uri: selectionDetails.getSelection()[0].uri
	}
}

export default ModelSelection;