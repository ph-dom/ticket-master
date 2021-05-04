const modalReducerDefaultState = {
    open: false,
    title: '',
    message: '',
    type: ''
};

const modalReducer = (state = modalReducerDefaultState, action) => {
    switch (action.type) {
        case 'OPEN_MODAL':
            return action.data;
        case 'CLOSE_MODAL':
            return modalReducerDefaultState;
        default:
            return state;
    }
};

export default modalReducer;