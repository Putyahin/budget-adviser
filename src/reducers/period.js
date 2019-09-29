const period = (state = {from: undefined, to: undefined}, action) => {
    switch(action.type) {
        case 'PERIOD_CHANGE':
            return Object.assign({},action.payload);
        default: return state;       
    }
};

export default period;