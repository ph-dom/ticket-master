import React from 'react';
import {┬áProvider } from 'react-redux';
import AppRouter from './router/AppRouter';
import store from './redux/index';

const App = () => (
	<Provider store={store}>
		<AppRouter />
	</Provider>
);
export default App;
