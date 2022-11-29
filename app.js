const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const app = express();
require('dotenv').config();


// Const de rotas
const rotaInicial = require('./routes/inicial');
const user = require ('./controllers/userController');
const emp = require ('./controllers/empController');
const reserv = require ('./controllers/reservController');
const agua = require('./controllers/aguaController');


// Cors
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: 'application/vnd.api+json' }));
app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Rotas da API
app.use(rotaInicial);

// Usuario
app.post('/Usuario/Cadastro', user.createUser);
app.post('/Usuario/ValidarEmail', user.ValEmail);
app.get('/Usuario/:email/:senha', user.login);
app.get('/Usuario/:id_usuario', user.getDados);
app.put('/Usuario/Atualizar/:id_usuario', user.update);
app.put('/Usuario/AlterarSenha/:id_usuario', user.forgetPass);

// Empresa
app.post('/Empresa/Cadastro', emp.createEmp);
app.post('/Empresa/ValidarEmail', emp.ValEmail);
app.get('/Empresa/:email/:senha', emp.login);
app.get('/Empresa/:id_empresa', emp.getDados);
app.put('/Empresa/Atualizar/:id_empresa', emp.update);
app.put('/Empresa/AlterarSenha/:id_empresa', emp.forgetPass);

// Reservatorio
app.post('/Reservatorio/Incluir', reserv.incluirReservatorio);  
app.get('/Reservatorio/:id_user', reserv.retornaReservatorio);  

// Agua
app.post('/Agua/Incluir', agua.incluiAgua);    
app.get('/Agua/:id_reserv', agua.retornaAgua); 



// --------------------------------------------------- //

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



