const express = require('express');
const { db, FieldValue } = require('../config/firebase-admin');
const Card = require('./model');
const { createCard, createRequestParams, getCardData } = require('./controller');
const authmid = require('../middleware/auth');

const router = express.Router();

router.post('/api/cards', authmid, async (request, response) => {
    try {
        const user = request.user;
        const newCard = new Card(request.body).toObject();
        let card = await createCard(newCard);
        if(user.projects.indexOf(card.project) === -1) {
            throw new Error('No puedes crear incidencias para este proyecto.');
        }
        let promises = await createRequestParams(card.id, user.email, user.name, card.project);
        await Promise.all(promises);
        await db.collection('users').doc(user.uid).update({
            tickets: FieldValue.arrayUnion(card.id)
        });
        response.status(200).send({
            id: card.id
        });
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
})

module.exports = router;