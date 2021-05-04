import React from 'react';
import { Provider } from 'react-redux';
import AppRouter from './router/AppRouter';
import store from './redux/index';

const App = () => (
	<Provider store={store}>
		<AppRouter />
	</Provider>
);
export default App;
