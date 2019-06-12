import React from 'react';
import { connect } from 'react-redux';
import Mdl from './Model';
import { 
	load,
	create
} from './action';

const mapStateToProps = (state = {}) => {
	return state;
}

const mapDispatchToProps = (dispatch) => {
	return {
		load: () => {
			dispatch(load());
		},
		create: model => {
			dispatch(create(model));
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Mdl);