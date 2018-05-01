//PORT config
require('./config/config');

const express = require('express');
const path = require('path');
const http = require('http');
const _ = require('lodash');
const bodyParser = require('body-parser');
const { ObjectId } = require('mongodb');

// DB manage
var { mongoose } = require('./db/mongoose');
var { User } = require('./models/user');
var { authenticate } = require('./middleware/authenticate');

const publicPath = path.join(__dirname, '../public');

const port = process.env.PORT;

var app = express();

var server = http.createServer(app);

//REACT
app.use(express.static(publicPath));

app.get('*', function (req, res) {
    res.sendFile(`${publicPath}/index.html`);
});

// API USERS
app.use(bodyParser.json());

app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);
    user.save()
        .then(() => {
            return user.generateAuthToken();
        })
        .then((token) => {
            res.header('x-auth', token).send(user);
        })
        .catch((e) => {
            res.sendStatus(400);
        });

});

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

app.post('/users/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        });
    }).catch((e) => {
        res.status(400).send();
    });
});

app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

module.exports = {
    app: app
};