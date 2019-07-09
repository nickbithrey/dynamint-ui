import React from 'react';
import PropTypes from 'prop-types';
import Table from '../Table';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { Selection } from 'office-ui-fabric-react/lib/DetailsList';

const SelectorTable = ({items, load, columns, selection}) => (
	<MarqueeSelection selection={selection}>
		<Table list={items} load={load} columns={columns} selection={selection}></Table>
	</MarqueeSelection>
);

SelectorTable.propTypes = {
	itms: PropTypes.array,
	load: PropTypes.func.isRequired,
	columns: PropTypes.arrayOf(PropTypes.object).isRequired,
	selection: PropTypes.object.isRequired
};

export default SelectorTable;