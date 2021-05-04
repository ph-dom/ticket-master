let boardReducerDefaultState = {
    labels: [],
    customFields: [],
    lists: [],
    members: []
};

const boardReducer = (state = boardReducerDefaultState, action) => {
    switch (action.type) {
        case 'GET_BOARD_DATA':
            return {
                ...state,
                ...action.data
            };
        case 'LOGOUT_USER':
            return boardReducerDefaultState;
        default:
            return state;
    }
};

export default boardReducer;