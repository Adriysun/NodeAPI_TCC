const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var timeout = require('connect-timeout');


const app = express();
app.use(timeout('10s'))
app.use(bodyParser())
app.use(haltOnTimedout)
app.use(cookieParser())
app.use(haltOnTimedout)

require('dotenv').config();

// Const de rotas
const rotaInicial = require('./routes/inicial');
const userRoute = require ('./routes/usuarios.routes');
const userRotas = require('./routes/usuarios.routes');

// Cors
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: 'application/vnd.api+json' }));
app.use(cors());

// Rotas da API
app.use(rotaInicial);
app.use('/api/', userRoute);
app.use('/api/', userRotas);

function haltOnTimedout (req, res, next) {
    if (!req.timedout) next()
  }

// Conexão com o banco PostgreSQL
const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: {
        rejectUnauthorized: false
      }
})

// Rota usuario
app.get('/usuario', async (req, res) =>{
    try{
        const { rows } = await pool.query('SELECT * FROM usuario')  
        return res.status(200).send(rows)
    } catch(err) {
        return res.status(400).send(err)
    }
})


// Rota empresa
app.get('/empresa', async (req, res) =>{
    try{
        const { rows } = await pool.query('SELECT * FROM empresa')  
        return res.status(200).send(rows)
    } catch(err) {
        return res.status(400).send(err)
    }
})

// Rota reservatorio
app.get('/reservatorio', async (req, res) =>{
    try{
        const { rows } = await pool.query('SELECT * FROM reservatorio')  
        return res.status(200).send(rows)
    } catch(err) {
        return res.status(400).send(err)
    }
})

// Rota agua
app.get('/agua', async (req, res) =>{
    try{
        const { rows } = await pool.query('SELECT * FROM agua')  
        return res.status(200).send(rows)
    } catch(err) {
        return res.status(400).send(err)
    }
})


module.exports = app;



