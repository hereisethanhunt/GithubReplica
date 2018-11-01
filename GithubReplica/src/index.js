import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter , Route , Switch } from 'react-router-dom';

import reducers from './reducers';
import './css/index.css';

import ReduxPromise from 'redux-promise';

import Dashboard from './components/Dashboard';
import NotFound from './components/NotFound';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
    	<div>
    	<Switch>
        <Route path='/:userId/' component = {Dashboard} />
        <Route component={NotFound} />
    	</Switch>
    	</div>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));
