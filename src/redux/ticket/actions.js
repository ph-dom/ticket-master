import axios from 'axios';
import { openModal } from '../modal/actions';

const getUserTickets = tickets => ({
    type: 'GET_USER_TICKETS',
    data: tickets
});

export const startGetUserTickets = () => {
    return (dispatch, getState) => {
        return axios.get('/api/cards', {
            headers: {
                'Authorization': 'Bearer ' + getState().user.idToken
            }
        }).then(response => {
            dispatch(getUserTickets(response.data));
        }).catch(error => {
            console.log(error);
            dispatch(openModal('Lo sentimos!', 'Error al obtener tickets.', 'ERROR'));
        });
    };
};

const createTicket = (createdTicket) => ({
    type: 'CREATE_TICKET',
    data: createdTicket
});

export const startCreateTicket = ticket => {
    return (dispatch, getState) => {
        return axios.request({
            url: '/api/cards',
            method: 'post',
            data: ticket,
            headers: {
                'Authorization': 'Bearer ' + getState().user.idToken
            }
        }).then(response => {
            const createdTicket = response.data;
            dispatch(createTicket(createdTicket));
        }).catch(error => {
            console.log(error);
            dispatch(openModal('Lo sentimos!', 'Error al crear ticket.', 'ERROR'));
        });
    };
};