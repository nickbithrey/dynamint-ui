import React from 'react';
import { connect } from 'react-redux';
import detailsComponent from '~/lib/DetailsComponent';
import { 
	load as loadDetails,
	clear as clearDetails,
	updateField,
	update as updateDetails
} from './action';
import Details from './ComponentConfigurationDetails';

const mapStateToProps = (state = { componentConfiguration : {}}) => {
	const details = resolveDetails(state.componentConfiguration.details);
	return {
		title: details.record ? details.record.reference + ' Details' : '',
		record: details.record,
		error: details.error,
		loading: details.loading
	};
}

function resolveDetails(details = {}) {
	return details
}

const mapDispatchToProps = (dispatch) => {
	return {
		load: (uri, isCreate) => dispatch(loadDetails(uri, isCreate)),
		clear: () => dispatch(clearDetails()),
		updateField: field => dispatch(updateField(field)),
		update: (config, uri, isCreate) => dispatch(updateDetails(config, uri, isCreate))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(detailsComponent(Details));