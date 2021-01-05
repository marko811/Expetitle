/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { YellowBox, Linking } from 'react-native';
import AppContainer from './src/Containers/App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './store';
YellowBox.ignoreWarnings([ 'Remote debugger', 'componentWillMount', 'Possible Unhandled Promise Rejection' ]);

console.disableYellowBox = true;
export default class App extends React.Component {
	

	render() {
		const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

		return (
			<Provider store={store}>
				<AppContainer />
			</Provider>
		);
	}
}
