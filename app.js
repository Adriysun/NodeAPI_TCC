const express = require('express');
const { Pool } = require('pg');
const app = express();
require('dotenv').config();

// Const de rotas
const rotaInicial = require('./routes/inicial');


// Rotas
app.use('/', rotaInicial);


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


