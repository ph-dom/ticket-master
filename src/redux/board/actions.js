import axios from 'axios';
import { openModal } from '../modal/actions';

const getBoardData = ({ labels, customFields, lists, members }) => ({
    type: 'GET_BOARD_DATA',
    data: {
        labels,
        customFields,
        lists,
        members
    }
});

export const startGetBoardData = () => {
    return (dispatch, getState) => {
        return axios.get('/api/board', {
            headers: {
                'Authorization': getState().user.idToken
            }
        }).then(response => {
            dispatch(getBoardData(response.data));
        }).catch(error => {
            console.log(error);
            dispatch(openModal('Lo sentimos!', 'Error al obtener datos de trello.', 'ERROR'));
        });
    };
};