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
        case 'ADD_COMMENT_TICKET':
            return state.map(ticket => {
                if(ticket.id === action.data.idTicket) {
                    return {
                        ...ticket,
                        actions: [
                            ...ticket.actions,
                            action.data.comment
                        ]
                    };
                }
                return ticket;
            });
        case 'LOGOUT_USER':
            return ticketsReducerDefaultState;
        default:
            return state;
    }
};

export default ticketReducer;