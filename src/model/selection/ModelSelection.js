import React from 'react';
import SelectionComponent, { SelectionButton, alwaysShow, hasSelection } from '~/lib/SelectionComponent';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';

const initModel = {};

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
		buttons={[new SelectionButton('Edit', '/models/edit', hasSelection, getUriFromSelection), new SelectionButton('Create', '/models/create')]}
	/>
);

const getUriFromSelection = selectionDetails => {
	return {
		id: selectionDetails.getSelection()[0].reference,
		uri: selectionDetails.getSelection()[0].uri
	}
}

export default ModelSelection;