const express = require('express');
const multer = require('multer');
const FormData = require('form-data');
const { db, FieldValue } = require('../config/firebase-admin');
const Card = require('./model');
const { createCard, createRequestParams, getCardData, addCommentToCard, addAttachmentToCard } = require('./controller');
const authmid = require('../middleware/auth');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = express.Router();

router.post('/api/cards', authmid, async (request, response) => {
    try {
        const user = request.user;
        let newCard = new Card(request.body).toObject();
        await createCard(newCard);
        if(user.projects.indexOf(newCard.project) === -1) {
            throw new Error('No puedes crear incidencias para este proyecto.');
        }
        let updateCustomFieldsPromises = await createRequestParams(newCard.id, user.email, user.name, newCard.project);
        await Promise.all(updateCustomFieldsPromises);
        await db.collection('users').doc(user.uid).update({
            tickets: FieldValue.arrayUnion(newCard.id)
        });
        const card = await getCardData(newCard.id)
        response.status(200).send(card);
    } catch(error) {
        response.status(400).send(error.message);
    }
});

router.get('/api/cards', authmid, async (request, response) => {
    try {
        const tickets = request.user.tickets;
        if(tickets.length > 0) {
            const ticketsData = await Promise.all(tickets.map(idTicket => getCardData(idTicket)));
            response.status(200).send(ticketsData);
        } else {
            response.status(200).send([]);
        }
    } catch(error) {
        response.status(400).send(error.message);
    }
});

router.post('/api/cards/:idTicket/comments', authmid, async (request, response) => {
    try {
        const tickets = request.user.tickets;
        const idTicket = request.params.idTicket;
        if(tickets.indexOf(idTicket) === -1) {
            throw new Error('No puedes añadir comentarios a este ticket.');
        }
        const comment = request.body.comment;
        if(!idTicket || !comment || comment.trim().length === 0) {
            throw new Error('Datos inválidos');
        }
        const responseData = await addCommentToCard(idTicket, comment);
        response.status(200).send(responseData);
    } catch(error) {
        response.status(400).send(error.message);
    }
});

router.post('/api/cards/:idTicket/attachments', upload.single('file'), authmid, async (request, response) => {
    try {
        const tickets = request.user.tickets;
        const idTicket = request.params.idTicket;
        if(tickets.indexOf(idTicket) === -1) {
            throw new Error('No puedes añadir comentarios a este ticket.');
        }
        const formData = new FormData();
        formData.append('key', process.env.TRELLO_KEY);
        formData.append('token', process.env.TRELLO_TOKEN);
        formData.append('setCover', 'false');
        if(request.body.url) {
            formData.append('url', request.body.url);
        } else {
            formData.append('name', request.body.name);
            formData.append('file', request.file.buffer, { filename: request.file.originalname });
            formData.append('mimeType', request.file.mimetype);
        }
        const attachmentResponse = await addAttachmentToCard(idTicket, formData);
        response.status(200).send(attachmentResponse);
    } catch(error) {
        response.status(400).send(error.message);
    }
});

module.exports = router;