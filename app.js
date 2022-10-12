const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const app = express();
require('dotenv').config();

// Const de rotas
const rotaInicial = require('./routes/inicial');
const userRoute = require ('./routes/usuarios.routes');
const loginRoute = require ('./routes/usuarios.routes');

// Cors
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: 'application/vnd.api+json' }));
app.use(cors());

// Rotas da API
app.use(rotaInicial);
app.use('/api/', userRoute);
app.use('/api/', loginRoute);

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
app.get('/reservatorioUser', async (req, res) =>{
    try{
        const { rows } = await pool.query('SELECT * FROM reservatorioUser')  
        return res.status(200).send(rows)
    } catch(err) {
        return res.status(400).send(err)
    }
})
app.get('/reservatorioEmp', async (req, res) =>{
    try{
        const { rows } = await pool.query('SELECT * FROM reservatorioEmp')  
        return res.status(200).send(rows)
    } catch(err) {
        return res.status(400).send(err)
    }
})

// Rota agua
app.get('/aguaUser', async (req, res) =>{
    try{
        const { rows } = await pool.query('SELECT * FROM aguaUser')  
        return res.status(200).send(rows)
    } catch(err) {
        return res.status(400).send(err)
    }
})
app.get('/aguaEmp', async (req, res) =>{
    try{
        const { rows } = await pool.query('SELECT * FROM aguaEmp')  
        return res.status(200).send(rows)
    } catch(err) {
        return res.status(400).send(err)
    }
})


module.exports = app;



