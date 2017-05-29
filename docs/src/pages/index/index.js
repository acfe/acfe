import React from 'react';
import { render } from 'react-dom';
// redux
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import pageData from '../common/redux/reducers';
const combineReducer = combineReducers({
    pageData
});
const middleware = [thunk];
const store = createStore(
    combineReducer,
    applyMiddleware(...middleware)
);
// common
import "../common/less/common.less";
import "./less/index.less";
// components
import Index from './containers';

render(
    <Provider store={store}>
        <Index data-page="index"/>
    </Provider>,
    document.getElementById('app')
);
