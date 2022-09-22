const express = require('express');
const { Pool } = require('pg');
const app = express();
require('dotenv').config();

// Const de rotas
const rotaInicial = require('./routes/inicial');


// Rotas
app.use('/', rotaInicial);



const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: {
        rejectUnauthorized: false
      }
})


app.get('/usuario', async (req, res) =>{
    try{
        const { rows } = await pool.query('SELECT * FROM usuario')  
        return res.status(200).send(rows)
    } catch(err) {
        return res.status(400).send(err)
    }
})



app.get('/empresa', async (req, res) =>{
    try{
        const { rows } = await pool.query('SELECT * FROM empresa')  
        return res.status(200).send(rows)
    } catch(err) {
        return res.status(400).send(err)
    }
})

app.get('/reservatorio', async (req, res) =>{
    try{
        const { rows } = await pool.query('SELECT * FROM reservatorio')  
        return res.status(200).send(rows)
    } catch(err) {
        return res.status(400).send(err)
    }
})



app.get('/agua', async (req, res) =>{
    try{
        const { rows } = await pool.query('SELECT * FROM agua')  
        return res.status(200).send(rows)
    } catch(err) {
        return res.status(400).send(err)
    }
})


module.exports = app;

// https://www.youtube.com/watch?v=8T8YmSHZ3fg

/*
getd7ce4r1uh8vjhu()

async function getd7ce4r1uh8vjhu(){
try{
    console.log("Iniciando a conexão.")
    await cliente.connect()
    console.log("Conexão bem sucedida!")
    const resultado = await cliente.query("select * from empresa")
    console.table(resultado.rows)
}
catch (ex){
    console.log("Ocoreu erro no get. Erro: "+ ex)
}
finally{
    await cliente.end()
    console.log("Cliente desconectado.")
}
}
*/
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
