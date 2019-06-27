import React from 'react';
import { connect } from 'react-redux';
import Mdl from './Model';

const mapStateToProps = (state = {}) => {
	return state;
}

const mapDispatchToProps = (dispatch) => {
	return {
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Mdl);