require("babel-core/register");
require("babel-polyfill");

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.observer.component';

ReactDOM.render(
	<App />,
	document.getElementById('app')
);