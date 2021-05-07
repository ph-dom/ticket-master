const express = require('express');
const authmid = require('../middleware/auth');
const { getBoardData } = require('./controller')

const router = express.Router();

router.get('/api/board', authmid, (request, response) => {
    getBoardData().then(data => {
        response.status(200).send(data);
    }).catch(error => {
        response.status(400).send({
            message: 'Error al cargar datos de tablero.',
            error
        });
    });
});

module.exports = router;