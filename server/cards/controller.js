const axios = require('axios').default;
const { getCustomFields } = require('../board/contorller');

const instance = axios.create({
    baseURL: 'https://api.trello.com'
});

const createCard = card => {
    return instance.request({
        method: 'post',
        url: '/1/cards',
        params: {
            key: process.env.TRELLO_KEY,
            token: process.env.TRELLO_TOKEN,
            idList: card.idList,
            idLabels: card.idLabels,
            idMembers: card.idMembers,
            name: card.name,
            desc: card.desc
        }
    }).then(response => {
        card.id = response.data.id;
        return card;
    });
}

const updateCustomFields = (idCard, idCustomField, data) => {
    return instance.request({
        method: 'put',
        url: `/1/cards/${idCard}/customField/${idCustomField}/item`,
        params: {
            key: process.env.TRELLO_KEY,
            token: process.env.TRELLO_TOKEN
        },
        data
    }).then(response => {
        return response.data;
    });
}

const createRequestParams = async (idCard, email, name, project) => {
    const customFields =  await getCustomFields();
    const promises = [];
    for(let custom of customFields) {
        let data = {};
        switch(custom.name) {
            case 'correo informador':
                data.value = {
                    text: email
                };
                break;
            case 'nombre informador':
                data.value = {
                    text: name
                }
                break;
            case 'proyecto':
                data.idValue = custom.options.find(opt => opt.value.text === project).id;
                break;
            default:
                throw new Error('CUSTOM FIELD NO SOPORTADO');
        }
        promises.push(updateCustomFields(idCard, custom.id, data));
    }
    return promises;
}

const getCardData = idCard => {
    return instance.get(`/1/cards/${idCard}`, {
        params: {
            key: process.env.TRELLO_KEY,
            token: process.env.TRELLO_TOKEN,
            attachments: true
        }
    }).then(response => {
        return response.data;
    })
}

module.exports = {
    createCard,
    createRequestParams,
    getCardData
};