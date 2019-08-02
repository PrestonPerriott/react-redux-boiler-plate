'use strict'

import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './Reducers';

//var to keep track of inital state
const initialState = {};

//any middleware we need, allows us to make asyn callss
const middleware = [thunk];

const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

export default store;

