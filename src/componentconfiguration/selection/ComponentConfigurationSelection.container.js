import React from 'react';
import { connect } from 'react-redux';
import Selection from './ComponentConfigurationSelection';
import { 
	load
} from './action';

const mapStateToProps = (state = {}) => {
	return state.componentConfiguration.selection ? state.componentConfiguration.selection : {};
}

const mapDispatchToProps = (dispatch) => {
	return {
		load: () => {
			dispatch(load());
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Selection);