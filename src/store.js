import {createStore} from 'redux';
import reducer from './reducers';

const storeSaver = () => {
    const state = store.getState();
    localStorage.setItem('transactions', JSON.stringify(state.transactions));
    localStorage.setItem('income', JSON.stringify(state.types.incomeTransactionsList));
    localStorage.setItem('expenses', JSON.stringify(state.types.expensesTransactionsList));
}; 

const store = createStore(reducer);
store.subscribe(storeSaver);



export default store;