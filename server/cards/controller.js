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
        return response.data;
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
    console.log({idCard, email, name, project})
    const customFields =  await getCustomFields();
    console.log(customFields)
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
                };
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
            attachments: true,
            customFieldItems: true,
            list: true,
            members: true,
            actions: 'commentCard'
        }
    }).then(response => {
        return response.data;
    })
}

const addCommentToCard = (idCard, comment) => {
    return instance.request({
        method: 'post',
        url: `/1/cards/${idCard}/actions/comments`,
        params: {
            key: process.env.TRELLO_KEY,
            token: process.env.TRELLO_TOKEN,
            text: comment
        }
    }).then(response => {
        return response.data;
    });
}

const addAttachmentToCard = (idCard, attachment) => {
    return instance.request({
        method: 'post',
        url: `/1/cards/${idCard}/attachments`,
        params: {
            key: process.env.TRELLO_KEY,
            token: process.env.TRELLO_TOKEN,
            name: attachment.name, //The name of the attachment. Max length 256.
            file: attachment.file, //The file to attach, as multipart/form-data
            mimeType: attachment.mimeType, //The mimeType of the attachment. Max length 256
            url: attachment.url, //A URL to attach. Must start with http:// or https://
            setCover: false //Determines whether to use the new attachment as a cover for the Card.
        },
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(response => {
        return response.data;
    });
}

module.exports = {
    createCard,
    createRequestParams,
    getCardData,
    addCommentToCard,
    addAttachmentToCard
};