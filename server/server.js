require('dotenv').config();
const express = require('express');
const massive = require('massive');
const pc = require('../products_controller');
const { SERVER_PORT, CONNECTION_STRING } = process.env; // process = global var for node environment

const app = express();
app.use(express.json());

massive(CONNECTION_STRING)
    .then(dbInstance => {
        app.set('db', dbInstance);
    })
    .catch(err => `u got a error! here it is: ${console.log(err)}`)

app.get('/api/products', pc.getAll);
app.get('/api/products/:id', pc.getOne);
app.put('/api/products/:id', pc.update);
app.post('/api/products', pc.create);
app.delete('/api/products/:id', pc.delete);

app.listen(SERVER_PORT, () => {
    console.log(`Server's runnin' over on port ${SERVER_PORT}.`)
})