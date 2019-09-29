import { combineReducers } from 'redux';
import transactions from './transactions';
import types from './types';
import period from './period';

export default combineReducers({
    transactions: transactions,
    types: types,
    period: period
});