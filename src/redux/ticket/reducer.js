let ticketsReducerDefaultState = [];

const ticketReducer = (state = ticketsReducerDefaultState, action) => {
    switch (action.type) {
        case 'GET_USER_TICKETS':
            return action.data;
        case 'CREATE_TICKET':
            return [
                ...state,
                action.data
            ];
        case 'LOGOUT_USER':
            return ticketsReducerDefaultState;
        default:
            return state;
    }
};

export default ticketReducer;