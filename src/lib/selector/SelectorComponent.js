import React from 'react';
import PropTypes from 'prop-types';
import { Columnar, Rowise, Block } from '../Grid';
import { Selection } from 'office-ui-fabric-react/lib/DetailsList';
import SelectorTitle from './SelectorTitle';
import SelectorTable from './SelectorTable';
import SelectorButtons from './SelectorButtons';
import SelectionButton, { hasSelection, alwaysShow, getUriFromSelection } from './SelectionButton';

export default class SelectionComponent extends React.Component {
	
	constructor(props) {
		super(props);
		this.onSelectionChanged = this.onSelectionChanged.bind(this);

		this.selection = new Selection({
		    onSelectionChanged: this.onSelectionChanged
	    });
		if (props.includeDefaultButtons) {
			this.buttons = [...props.buttons, ...this.defaultButtons(props.location, props.uri)];
		} else {
			this.buttons = props.buttons;
		}
	}
	
	defaultButtons(location, uri) {
		return [
			new SelectionButton('Edit', location.pathname + '/edit', hasSelection, getUriFromSelection), 
			new SelectionButton('Create', location.pathname + '/create', alwaysShow, deets => ({ isCreate: true, uri: uri }))
		]
	}
	
	onSelectionChanged() {
		this.setState({
			selected: this.selection.getSelection()
		});
	}
	
	render() {
		const {
			title, 
			items, 
			load, 
			columns
		} = this.props;
		return (
			<div>
				<SelectorTitle title={title} />
				<Rowise tokens={{childrenGap: 10}}>
					<Block>
						<SelectorTable items={items} load={load} columns={columns} selection={this.selection} />
					</Block>
					<Block>
						<Columnar horizontalAlign={'end'} tokens={{childrenGap: 5}}>
							<SelectorButtons buttons={this.buttons} selection={this.selection} />
						</Columnar>
					</Block>
				</Rowise>
			</div>
		);
	}
	
}

SelectionComponent.defaultProps = {
	includeDefaultButtons: true,
	buttons: []
}

SelectionComponent.propTypes = {
	title: PropTypes.string,
	items: PropTypes.array,
	load: PropTypes.func,
	columns: PropTypes.arrayOf(PropTypes.object).isRequired,
	buttons: PropTypes.arrayOf(PropTypes.object).isRequired,
	includeDefaultButtons: PropTypes.bool.isRequired
};
