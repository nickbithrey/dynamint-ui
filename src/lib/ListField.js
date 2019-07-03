import React from 'react';
import PropTypes from 'prop-types';
import Field from './Field';
import Button from '~/lib/Button';
import { Rowise, Block } from '~/lib/Grid';
import { DetailsList, DetailsRow, DetailsListLayoutMode, SelectionMode, Selection } from 'office-ui-fabric-react/lib/DetailsList';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';

export default class ListField extends React.Component {
	
	constructor(props) {
		super(props);
		this.update = this.update.bind(this);
		this.addElement = this.addElement.bind(this);
		
		this.selection = new Selection({
		    onSelectionChanged: () => {
		        this.setState({
		            selectionDetails: this.getSelectionDetails()
		        });
		    }
	    });
		this.state = {};
	}
	
	getSelectionDetails() {
		if (this.selection.getSelectedCount() > 0) {
			this.setState({
				index: this.selection.getSelectedCount()
			});
			return this.selection;
		}
	}
	
	update(element, index) {
		const list = [...this.props.value];
		list[index] = element;
		this.props.update({
			name: this.props.name,
			value: list
		});
		this.selection.toggleIndexSelected(index);
	}
	
	addElement(e) {
		e.preventDefault();
		const list = [...this.props.value];
		list.push({...this.props.newElement});
		this.props.update({
			name: this.props.name,
			value: list
		});
//		this.selection.toggleIndexSelected(list.length);
	}
	
	render() {
		const {
			value,
			columns,
			...remainingProps
		} = this.props;
		return (
			<div>
				<Rowise tokens={{childrenGap: 5}}>
					<Block>
						<DetailsList
							items={[...value]}
						    compact={false}
						    columns={columns}
						    selectionMode={SelectionMode.single}
						    setKey="set"
						    layoutMode={DetailsListLayoutMode.justified}
						    isHeaderVisible={true}
							onRenderItemColumn={this.renderColumn}
							onRenderRow={this.renderRow(this.update, this.props.tag)}
						    selectionPreservedOnEmptyClick={true}
							selection={this.selection}
						    enterModalSelectionOnTouch={true}
						    ariaLabelForSelectionColumn="Toggle selection"
						    ariaLabelForSelectAllCheckbox="Toggle selection for all items"
					    />
					</Block>
					<Block>
						<Button text="Add" onClick={this.addElement} />
					</Block>
				</Rowise>
			</div>
		)
	}
	
	renderColumn(item, index, column) {
		  const fieldContent = item[column.fieldName];

		  switch (column.type) {
		    case 'boolean':
		      return <span><Checkbox checked={fieldContent} /></span>
		    default:
		      return <span>{fieldContent}</span>;
		  }
		}
	
	renderRow(fieldUpdate, tag) {
		return function(props) {
			if (props.selection.getSelectedIndices().includes(props.itemIndex)) {
				const Tag = listUpdate(tag);
				return (
					<div>
						<DetailsRow {...props} />
						<Tag fieldUpdate={fieldUpdate} {...props} />
					</div>
				)
			}
			return <DetailsRow {...props} />
		}
	}
	
}

export function listUpdate(WrappedComponent) {
	return class ListUpdate extends React.Component {
		constructor(props) {
			super(props);
			this.update = this.update.bind(this);
			this.updateField = this.updateField.bind(this);
			this.index = props.itemIndex;
			this.state = {...props.item};
		}
		
		update(e) {
			e.preventDefault();
			this.props.fieldUpdate(this.state, this.index);
		}
		
		updateField({name, value}) {
			this.setState({
				[name]: value
			});
		}
		
		render() {
			return (
				<div>
					<Rowise>
						<Block>
							<WrappedComponent updateField={this.updateField} {...this.state} />
						</Block>
						<Block>
							<Button text="Submit" onClick={this.update} />
						</Block>
					</Rowise>
				</div>
			)
		}
	}
}

ListField.defaultProps = {
	readOnly: true,
	value: []
};

ListField.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string,
	value: PropTypes.arrayOf(PropTypes.object),
	readOnly: PropTypes.bool.isRequired,
	update: PropTypes.func.isRequired,
	tag: PropTypes.func.isRequired
};
