/** This relative url is according main.js or main.min.js **/
//import "../assets/css/bootstrap.min.css"
import React from "react"
import ReactDOM from "react-dom"
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Layout from './Layout';
import About from './About';
import Dashboard from './Dashboard';

injectTapEventPlugin();

ReactDOM.render(
	<Router history={hashHistory}>
		<Route path="/" component={Layout}>
			<IndexRoute component={Dashboard}></IndexRoute>
			<Route path="about" component={About}></Route>
		</Route>
	</Router>
	, document.getElementById("app")
)

