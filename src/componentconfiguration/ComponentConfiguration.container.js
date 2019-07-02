import React from 'react';
import { connect } from 'react-redux';
import MenuPage from '~/lib/MenuPage';
import Selection from './selection';
import Details from './details';

const routes = [
	{exact: true, path: '/compconfigs', component: Selection},
	{exact: false, path: '/compconfigs/:type', component: Details}
];

const mapStateToProps = (state = {}) => {
	return {...state, routes: routes};
}

const mapDispatchToProps = (dispatch) => {
	return {
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuPage);