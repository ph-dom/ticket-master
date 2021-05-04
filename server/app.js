const path = require('path');
const express = require('express');
const usersRouter = require('./users/router');
const cardsRouter = require('./cards/router');
const boardRouter = require('./board/router');

const app = express();
const publicPath = path.join(__dirname, '..', 'build');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(usersRouter);
app.use(cardsRouter);
app.use(boardRouter);
app.use(express.static(publicPath));

app.get(/\/(?!api\/).*/, (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

module.exports = app;