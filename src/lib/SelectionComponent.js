import React from 'react';
import PropTypes from 'prop-types';
import Table from './Table';
import { Link } from 'react-router-dom';
import Button from './Button';
import ButtonsContainer from './ButtonsContainer';
import { Columnar, Rowise, Block } from './Grid';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { Selection } from 'office-ui-fabric-react/lib/DetailsList';

export default class SelectionComponent extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {};

		this.selection = new Selection({
		    onSelectionChanged: () => {
		        this.setState({
		            selectionDetails: this.getSelectionDetails()
		        });
		    }
	    });
		this.renderButton = this.renderButton.bind(this);
	}
	
	getSelectionDetails() {
		if (this.selection.getSelectedCount() > 0) {
			return this.selection;
		}
	}
	
	renderTitle(title) {
		if (title) {
			return (
				<div>
					<h1>{title}</h1>
				</div>
			);
		}
	}

	renderSelectionTable(list, loadList, columns) {
		return (
			<MarqueeSelection selection={this.selection}>
				<Table list={list} load={loadList} columns={columns} selection={this.selection}></Table>
			</MarqueeSelection>
		);
	}

	renderButtons(buttons = []) {
		return (
			<ButtonsContainer>
				{buttons.map(btn => btn.build()).filter(btn => btn.condition(this.selection)).map(this.renderButton)}
			</ButtonsContainer>
		);
	}
	
	renderButton(btn, i) {
		let to = {
			pathname: btn.pathname,
			state: btn.stateFn(this.selection)
		};
		return <Link key={i} to={to}><Button text={btn.text} /></Link>
	}
	
	render() {
		const {
			title, 
			list, 
			loadList, 
			columns, 
			buttons
		} = this.props;
		return (
			<div>
				{this.renderTitle(title)}
				<Rowise tokens={{childrenGap: 10}}>
					<Block>
						{this.renderSelectionTable(list, loadList, columns)}
					</Block>
					<Block>
						<Columnar horizontalAlign={'end'} tokens={{childrenGap: 5}}>
							{this.renderButtons(buttons)}
						</Columnar>
					</Block>
				</Rowise>
			</div>
		);
	}
	
}

SelectionComponent.propTypes = {
	title: PropTypes.string,
	list: PropTypes.array,
	loadList: PropTypes.func,
	columns: PropTypes.arrayOf(PropTypes.object).isRequired,
	buttons: PropTypes.arrayOf(PropTypes.object)
};

export class SelectionButton {
	
	constructor(text, path, condition, stateFn) {
		this.text = text;
		this.path = path;
		this.condition = condition;
		this.stateFn = stateFn;
	}
	
	build() {
		return {
			text: this.text,
			pathname: this.path,
			stateFn: this.stateFn ? this.stateFn : () => {},
			condition: this.condition ? this.condition : alwaysShow
		};
	}
	
}

const alwaysShow = () => true;

const hasSelection = selection => selection.getSelectedCount() > 0;

export {
	alwaysShow,
	hasSelection
};
