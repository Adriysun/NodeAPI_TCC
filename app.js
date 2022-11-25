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

app.post('/Usuario/Cadastro', user.createUser);
app.get('/Usuario/:email/:senha', user.login);
app.get('/Usuario/:id_usuario', user.getDados);
app.put('/Usuario/Atualizar/:id_usuario', user.update);
app.put('/Usuario/AlterarSenha/:id_usuario', user.forgetPass);

app.post('/Empresa/Cadastro', emp.createEmp);
app.get('/Empresa/:email_emp/:senha', emp.login);
//app.put('/Empresa/Atualizar/:id_empresa', emp.update);

app.post('/Reservatorio_User/Incluir', reserv.incluiReservUser); 
app.get('/Reservatorio_User/:id_usuario', reserv.retornaReservUser);

app.post('/Reservatorio_Emp/Incluir', reserv.incluiReservEmp); // teste
app.get('/Reservatorio_Emp/:id_empresa', reserv.retornaReservEmp);

app.post('/Agua_User/Incluir', agua.incluiAguaUser); 
app.post('/Agua_Emp/Incluir', agua.incluiAguaEmp); 

app.get('/Agua_User/:id_reservuser', agua.retornaAguaUser);
app.get('/Agua_Emp/:id_reservemp', agua.retornaAguaEmp);



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



