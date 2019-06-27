import React from 'react';
import { connect } from 'react-redux';
import MdlSelection from './ModelSelection';
import { 
	load
} from './action';

const mapStateToProps = (state = {}) => {
	return state;
}

const mapDispatchToProps = (dispatch) => {
	return {
		load: () => {
			dispatch(load());
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MdlSelection);