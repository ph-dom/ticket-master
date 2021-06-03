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
            console.log(error.message);
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
            ticket.id = response.data.id;
            const createdTicket = response.data;
            dispatch(createTicket(createdTicket));
            window.M.toast({ html: 'Ticket creado exitosamente.' });
        }).catch(error => {
            console.log(error.message);
            dispatch(openModal('Lo sentimos!', 'Error al crear ticket.', 'ERROR'));
        });
    };
};

const addCommentToTicket = (idTicket, comment) => ({
    type: 'ADD_COMMENT_TICKET',
    data: {
        idTicket,
        comment
    }
});

export const startAddCommentToTicket = (idCard, comment) => {
    return (dispatch, getState) => {
        return axios.request({
            url: `/api/cards/${idCard}/comments`,
            method: 'post',
            data: comment,
            headers: {
                'Authorization': 'Bearer ' + getState().user.idToken
            }
        }).then(response => {
            comment.id = response.data.id;
            dispatch(addCommentToTicket(idCard, response.data));
            window.M.toast({ html: 'Comentario enviado exitosamente.' });
        }).catch(error => {
            console.log(error.message);
            dispatch(openModal('Lo sentimos!', 'Error al agregar comentario.', 'ERROR'));
        });
    };
};

const addAttachmentToTicket = (idTicket, attachment) => ({
    type: 'ADD_ATTACHMENT_TICKET',
    data: {
        idTicket,
        attachment
    }
});

export const startAddAttachmentToCard = (idTicket, formData) => {
    return (dispatch, getState) => {
        return axios.request({
            url: `/api/cards/${idTicket}/attachments`,
            method: 'post',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + getState().user.idToken
            }
        }).then(response => {
            dispatch(addAttachmentToTicket(idTicket, response.data));
            window.M.toast({ html: 'Archivo adjunto exitosamente.' });
        }).catch(error => {
            console.log(error.message);
            dispatch(openModal('Lo sentimos!', 'Error al agregar comentario.', 'ERROR'));
        });
    };
};