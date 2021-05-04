const axios = require('axios').default;

const instance = axios.create({
    baseURL: 'https://api.trello.com'
});

const getBoardData = () => {
    return instance.get(`/1/boards/${process.env.TRELLO_ID_BOARD}`, {
        params: {
            key: process.env.TRELLO_KEY,
            token: process.env.TRELLO_TOKEN,
            customFields: true,
            labels: 'all',
            lists: 'all',
            members: 'all'
        }
    }).then(response => {
        const data = response.data;
        return {
            labels: data.labels,
            customFields: data.customFields,
            lists: data.lists,
            members: data.members,
        };
    });
}

const getCustomFields = () => {
    return instance.request({
        method: 'get',
        url: `https://api.trello.com/1/boards/${process.env.TRELLO_ID_BOARD}/customFields`,
        params: {
            key: process.env.TRELLO_KEY,
            token: process.env.TRELLO_TOKEN
        }
    }).then(response => {
        return response.data;
    });
}

module.exports = {
    getBoardData,
    getCustomFields
};