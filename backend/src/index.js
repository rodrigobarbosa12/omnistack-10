const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const routes = require('./routes');
const cors = require('cors');
const { setupWebsocket } = require('./websocket');

const app = express();
const server = http.Server(app);

setupWebsocket(server);

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-6jprn.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,    
    useUnifiedTopology: true,
});

app.use(cors())
app.use(express.json());
app.use(routes);


server.listen(3333, () => console.log('servidor rodando!'));
