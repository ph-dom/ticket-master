const express = require('express');
const { db, FieldValue } = require('../config/firebase-admin');
const Card = require('./model');
const { createCard, createRequestParams, getCardData, addCommentToCard } = require('./controller');
const authmid = require('../middleware/auth');

const router = express.Router();

router.post('/api/cards', authmid, async (request, response) => {
    try {
        const user = request.user;
        const newCard = new Card(request.body).toObject();
        let cardResponse = await createCard(newCard);
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

router.post('/api/cards/:idCard/comments', async (request, response) => {
    try {
        const idCard = request.params.idCard;
        const comment = request.body.comment;
        if(!idCard || !comment || comment.trim().length === 0) {
            throw new Error('Datos inválidos');
        }
        const responseData = await addCommentToCard(idCard, comment);
        response.status(200).send(responseData);
    } catch(error) {
        response.status(400).send(error.message);
    }
});

router.post('/api/cards/:idCard/attachments', async (request, response) => {
    try {
        const idCard = request.params.idCard;
        
    } catch(error) {
        response.status(400).send(error.message);
    }
});

module.exports = router;