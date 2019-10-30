import incomeList from '../incomeTransactionsList';
import expensesList from '../expensesTransactionsList';

const types = (state, action) => 
{   
    if (state === undefined) {
        let income = JSON.parse(localStorage.getItem('income'));
        let expenses = JSON.parse(localStorage.getItem('expenses'));
        if (income == null) {
            income = incomeList;
        }
        if (expenses == null) {
            expenses = expensesList;
        }
        const state = {
            incomeTransactionsList: income, 
            expensesTransactionsList: expenses
        };
        return state;
    }
    let newState;
    let idx;
     
    switch (action.type) {
        case 'ADD_TYPE':
            newState = state;
            if (action.payload.transactionType == 'Income') {
                newState.incomeTransactionsList.push(action.payload.data);
            } else {
                newState.expensesTransactionsList.push(action.payload.data);
            }
            return Object.assign({},newState);
        case 'DELETE_TYPE':
            newState = state;
            if (action.payload.transactionType == 'Income') {
                idx = state.incomeTransactionsList.findIndex
                    ((element) => element.id == action.payload.id);
                if(newState.incomeTransactionsList.length > 1) {
                    newState.incomeTransactionsList = [
                        ...state.incomeTransactionsList.slice(0, idx),
                        ...state.incomeTransactionsList.slice(idx + 1)];
                } else {
                    alert("You can't delete last item");
                }
            } else {
                idx = state.expensesTransactionsList.
                    findIndex((element) => element.id == action.payload.id);
                if(newState.expensesTransactionsList.length > 1) {
                    newState.expensesTransactionsList = [
                        ...state.expensesTransactionsList.slice(0, idx),
                        ...state.expensesTransactionsList.slice(idx + 1)];
                } else {
                    alert("You can't delete last item");
                }
            }
            return Object.assign({},newState);
        case 'EDIT_TYPE':
                newState = state;
                if (action.payload.transactionType == 'Income') {
                    idx = state.incomeTransactionsList.findIndex
                        ((element) => element.id == action.payload.data.id);
                    newState.incomeTransactionsList[idx] = action.payload.data;
                } else {
                    idx = state.expensesTransactionsList.findIndex
                        ((element) => element.id == action.payload.data.id);
                    newState.expensesTransactionsList[idx] = action.payload.data;
                }
                return Object.assign({},newState);
        default: return state;
    } 
};

export default types;