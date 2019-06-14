import React from 'react';
import { connect } from 'react-redux';
import ModelDetails from './ModelDetails';
import { 
	load,
	update,
	create,
	clear
} from './action';

const mapStateToProps = (state = {}) => {
	return {
		details: state.models.details
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		load: id => {
			dispatch(load(id));
		},
		update: (id, model) => {
			dispatch(update(id, model));
		},
		create: model => {
			dispatch(create(model));
		},
		clear: () => {
			dispatch(clear());
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ModelDetails);