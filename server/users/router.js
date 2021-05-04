const express = require('express');
const User = require('./model');
const { createUser } = require('./controller');
const authmid = require('../middleware/auth');

const router = express.Router();

router.post('/api/users', authmid, async (request, response) => {
    try {
        if(request.user.role !== 'admin') {
            response.status(401).send('No puedes realizar esta acción.');
        }
        const user = new User(request.body).toObject();
        const userRecord = await createUser(user);
        response.status(200).send({
            uid: userRecord.uid
        });
    } catch(error) {
        response.status(400).send(error.message);
    }
});

module.exports = router;