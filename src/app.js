// js imports
import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { Provider } from 'react-redux';

import store from './redux/store';

import Model from './model';


const Root = () => (
	<Provider store={store}>
		<Router>
			<div>
				<Route exact path="/" component={App}></Route>
				<Route path="/models" component={Model} store={store}></Route>
			</div>
		</Router>
	</Provider>
)

const App = (props) => (
	<div>
		<h1>Dynamint</h1>
		<Link to="/models">Models</Link>
	</div>
)

ReactDOM.render(<Root />, document.getElementById("index"));