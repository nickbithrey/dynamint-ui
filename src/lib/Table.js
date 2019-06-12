import React from 'react';
import PropTypes from 'prop-types';

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
			tag: Record
		} = this.props;
		if (!list) {
			return <h1>no data</h1>
		}
		return (
			<table>
				<tbody>
					{list.map((row,i) => <Record key={i} {...row}></Record>)}
				</tbody>
			</table>
		);
	}
	
}

Table.propTypes = {
	load: PropTypes.func.isRequired,
	list: PropTypes.arrayOf(PropTypes.object),
	tag: PropTypes.oneOfType([PropTypes.func,PropTypes.element,PropTypes.string]).isRequired
}
