const transactions = (state, action) => {
    if (state === undefined) {
        return [];
    }

    let newState;
    let idx;
    switch(action.type) {
        case 'DELETE_TRANSACTION':
            idx = state.findIndex((element) => element.id == action.payload);
            newState = [
                ...state.slice(0, idx),
                ...state.slice(idx + 1)
            ];
            return Object.assign([],newState);
        case 'EDIT_TRANSACTION':
            newState = state;
            idx = state.findIndex((element) => element.id == action.payload.id);
            newState[idx] = action.payload.transaction;
            return Object.assign([],newState);
        case 'ADD_TRANSACTION':
            return Object.assign([], 
                [...state, action.payload] );
        default: return state;       
    }
};

export default transactions;