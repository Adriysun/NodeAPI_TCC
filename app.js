const express = require('express');
const app = express();

const rotaProdutos = require('./routes/produtos');

app.use('/produtos', rotaProdutos);

module.exports = app;



// instalado o cliente postgre - npm install pg (08/09 no COTUCA)


/*
const express = require('express');
const app = express();
const router = express.Router();

//Rotas
const index = require('./routes/index');
const personRoute = require('./routes/personRoute');
app.use('/', index);
app.use('/persons', personRoute);

module.exports = app;
*/
