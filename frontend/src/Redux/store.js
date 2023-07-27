// frontend/src/redux/store/store.js

import {legacy_createStore as createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import companyReducer from './companyReducers';

const rootReducer = combineReducers({
  company: companyReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
