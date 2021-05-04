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
                'Authorization': getState().user.idToken
            }
        }).then(response => {
            dispatch(getUserTickets(response.data));
        }).catch(error => {
            console.log(error);
            dispatch(openModal('Lo sentimos!', 'Error al obtener tickets.', 'ERROR'));
        });
    };
};

const createTicket = ({ id, name, desc, idList, idLabels, idMembers, project }) => ({
    type: 'CREATE_TICKET',
    data: {
        id,
        name,
        desc,
        idList,
        idLabels,
        idMembers,
        project
    }
});

export const startCreateTicket = ticket => {
    return (dispatch, getState) => {
        return axios.request({
            url: '/api/cards',
            method: 'post',
            data: ticket
        }).then(response => {
            const idCard = response.data.id;
            ticket.id = idCard;
            dispatch(createTicket(ticket));
        }).catch(error => {
            console.log(error);
            dispatch(openModal('Lo sentimos!', 'Error al crear ticket.', 'ERROR'));
        });
    };
};