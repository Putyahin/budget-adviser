

const addTransaction = (transaction) => {
    return {
        type: 'ADD_TRANSACTION',
        payload: transaction
    };
};

const deleteTransaction = (id) => {
    return {
        type: 'DELETE_TRANSACTION',
        payload: id
    };
};

const editTransaction = (id, transaction) => {
    return {
        type: 'EDIT_TRANSACTION',
        payload: {id: id, transaction: transaction}
    };
};

const addType = (type, newType) => {
    return {
        type: 'ADD_TYPE',
        payload: {transactionType: type, data: newType}
    };
};

const editType = (type, newType) => {
    return {
        type: 'EDIT_TYPE', 
        payload: { transactionType: type, data: newType }
    };
};

const deleteType = (type, id) => {
    return {
        type: 'DELETE_TYPE', 
        payload: { transactionType: type, id: id }
    };
};

const newPeriod = (period) => {
    return {
        type: 'PERIOD_CHANGE',
        payload: period
    };
};

export {
    addTransaction,
    deleteTransaction,
    editTransaction,
    addType,
    editType,
    deleteType,
    newPeriod
};