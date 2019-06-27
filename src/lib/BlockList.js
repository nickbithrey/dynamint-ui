import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'office-ui-fabric-react/lib/List';

const renderCell = (tag, updateEntry) => {
	const CellTag = tag;
	return (item, index) => {
		return <CellTag item={item} index={index} update={updateEntry} />;
	};
};

const BlockList = ({items, tag, updateEntry}) => {
	return (
		<List
	        items={items}
	        onRenderCell={renderCell(tag, updateEntry)}
	    />
	);
};

BlockList.propTypes = {
	items: PropTypes.arrayOf(PropTypes.object).isRequired,
	tag: PropTypes.func.isRequired
}

export default BlockList;