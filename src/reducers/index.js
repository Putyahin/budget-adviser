import { combineReducers } from 'redux';
import transactions from './transactions';
import types from './types';

export default combineReducers({
    transactions: transactions,
    types: types
});