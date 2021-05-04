let userReducerDefaultState = {
    uid: null,
    email: null,
    phoneNumber: null,
    displayName: null,
    projects: null,
    idToken: null,
    role: null
};

const userReducer = (state = userReducerDefaultState, action) => {
    switch (action.type) {
        case 'LOGIN_USER':
            return action.data;
        case 'LOGOUT_USER':
            return userReducerDefaultState;
        default:
            return state;
    }
};

export default userReducer;