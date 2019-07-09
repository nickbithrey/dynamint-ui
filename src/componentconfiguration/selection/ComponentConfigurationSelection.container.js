import React from 'react';
import { connect } from 'react-redux';
import Selector from '~/lib/selector';
import { 
	load
} from './action';

const mapStateToProps = (state = {}) => {
	const result = state.componentConfiguration.selection ? state.componentConfiguration.selection : {};
	return {
		...result,
		title: 'Component Configuration',
		columns: columns
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		load: () => {
			dispatch(load());
		}
	}
}

const columns = [
    {key: 'reference', name: 'Reference', fieldName: 'reference', minWidth: 50, maxWidth: 150},
    {key: 'componentType', name: 'Type', fieldName: 'componentType', maxWidth: 50},
    {key: 'description', name: 'Description', fieldName: 'description', minWidth: 500}
];

export default connect(mapStateToProps, mapDispatchToProps)(Selector);