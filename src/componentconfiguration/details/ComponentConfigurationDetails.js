import React from 'react';
import PropTypes from 'prop-types';
import Field from '~/lib/Field';
import ListField from '~/lib/ListField';
import Button from '~/lib/Button';
import Attribute, { columns } from './ComponentConfigurationAttribute';
import { Rowise, Block } from '~/lib/Grid';

const Details = ({record, error, fieldUpdate, update, location}) => {
	return (
		<form>
			<Rowise tokens={{childrenGap: 5}}>
				<Block>
					<Field 
						name="reference" 
						label="Reference" 
						value={record.reference} 
						update={fieldUpdate} 
					/>
					<Field 
						name="description" 
						label="Description" 
						value={record.description} 
						update={fieldUpdate}  
					/>
					<Field 
						name="componentType" 
						label="Type" 
						value={record.componentType} 
						update={fieldUpdate} 
					/>
					<ListField 
						name="attributes" 
						label="Attributes"
						value={record.attributes} 
						update={fieldUpdate} 
						tag={Attribute}
						columns={columns}
						newElement={newAttribute(location.state.uri, location.state.isCreate)}
					/>
				</Block>
			</Rowise>
		</form>
	);
};

function newAttribute(uri, isCreate) {
	if (!isCreate && uri) {
		return {
			componentConfiguration: uri
		};
	}
	return {};
}

Details.defaultProps = {
	record: {}
}

Details.propTypes = {
	record: PropTypes.object.isRequired,
	error: PropTypes.object,
	fieldUpdate: PropTypes.func.isRequired,
	update: PropTypes.func.isRequired
};

export default Details;