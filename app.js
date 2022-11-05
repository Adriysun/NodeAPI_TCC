const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const app = express();
require('dotenv').config();

function middleWareGlobal(req, res, next) {
    console.time('Duraçao');
    console.log(req.url);

    next();

    console.log(req.url);
    console.timeEnd('Duraçao');
}



// Const de rotas
const rotaInicial = require('./routes/inicial');
const userRoute = require ('./routes/usuarios');
const loginRoute = require ('./routes/usuarios');
const empRoute = require ('./routes/empresas');
const loginEmpRoute = require ('./routes/empresas');
const reservRoute = require ('./routes/reservatorios');

// Cors
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: 'application/vnd.api+json' }));
app.use(cors());

// Rotas da API
app.use(rotaInicial);
app.use('/cadastro', userRoute);
app.use('/login/', loginRoute); 
app.use('/api/', empRoute);
app.use('/api/', loginEmpRoute);
app.use('/api/', reservRoute);


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



