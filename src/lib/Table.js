import React from 'react';
import PropTypes from 'prop-types';
import { DetailsList, DetailsListLayoutMode, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';

export default class Table extends React.Component {
	
	constructor(props) {
		super(props);
		this.load = props.load;
	}

	loadTable() {
		if (!this.props.list) {
			this.load();
		}
	}
	
	componentDidMount() {
		this.loadTable();
	}
	
	componentDidUpdate() {
		this.loadTable();
	}
	
	render() {
		let {
			list,
			columns
		} = this.props;
		
		if (!list) {
			return <h1>no data</h1>
		}
		return (
			<DetailsList
	            items={list}
	            compact={false}
	            columns={columns}
	            selectionMode={SelectionMode.single}
	            setKey="set"
	            layoutMode={DetailsListLayoutMode.justified}
	            isHeaderVisible={true}
				selection={this.props.selection}
	            selectionPreservedOnEmptyClick={true}
	            enterModalSelectionOnTouch={true}
	            ariaLabelForSelectionColumn="Toggle selection"
	            ariaLabelForSelectAllCheckbox="Toggle selection for all items"
	          />
		);
	}
	
}

Table.propTypes = {
	load: PropTypes.func.isRequired,
	list: PropTypes.arrayOf(PropTypes.object)
}


