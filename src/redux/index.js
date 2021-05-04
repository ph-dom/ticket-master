import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './user/reducer';
import boardReducer from './board/reducer';
import ticketReducer from './ticket/reducer';
import modalReducer from './modal/reducer';

const store = createStore(
    combineReducers({
        user: userReducer,
        board: boardReducer,
        tickets: ticketReducer,
        modal: modalReducer
    }),
    compose(applyMiddleware(thunk))
);

export default store;