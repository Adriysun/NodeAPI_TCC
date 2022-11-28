const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const userService = require('../services/userServices');


const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

const createUser = async (req, res) => {
  const { cpf, email, nome, sobrenome, senha, dtnasci } = req.body;
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error ao adquirir o cliente', err.stack)
    }
    client.query('SELECT * FROM usuario WHERE email = $1', [req.body.email],
      (err, result) => {
        release();
        if (err) {
          return console.error('Erro ao executar a query', err.stack);
        }
        if (result.rows.length > 0) {
          res.status(409).send({ mensagem: 'Email já cadastrado' })
          console.log('Email já cadastrado')
        }
        else {
          bcrypt.hash(req.body.senha, 10, (errBcrypt, hash) => {
            if (errBcrypt) { return res.status(500).send({ error: errBcrypt }); }
            client.query('INSERT INTO usuario (cpf, email, nome, sobrenome, senha, dtnasci) VALUES ($1, $2, $3, $4, $5, $6)',
              [req.body.cpf, email, nome, sobrenome, hash, dtnasci]);

            return res.status(201).send({
              mensagem: 'Usuário criado com sucesso!',
              usuarioCriado: { cpf, email, nome, sobrenome, dtnasci }
            });
          });
          console.log("Usuário cadastrado com sucesso!");
        }
      })
  })
}

const login = async (req, res) => {
  const { email, senha } = req.params
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error ao adquirir o cliente', err.stack)
    }
    const query = 'SELECT * FROM usuario WHERE email = $1'
    client.query(query, [req.params.email], (err, results, fields) => {
      release();
      if (err) {
        return console.error('Erro ao executar a query', err.stack);
      }
      if (results.rows.length < 1) {
        return res.status(401).send({ mensagem: 'Falha na autenticação1' })
      }
      bcrypt.compare(req.params.senha, results.rows[0].senha, (err, result) => {
        if (err) {
          return res.status(401).send({ mensagem: 'Falha na autenticação2' })
        }
        if (result) {
          const Id_Armazenado = {
            id_usuario: results.rows[0].id_usuario,
            nome: results.rows[0].nome
          }
          console.log('Autenticado com sucesso!');
          return res.status(200).send({
            mensagem: 'Autenticado com sucesso!',
            tokenUser: Id_Armazenado
          });
        }
        console.log('Senha Incorreta!')
        return res.status(401).send({ mensagem: 'Senha Incorreta' })
      })
    });
  })
}

const update = async (req, res) =>{
  const {id_usuario} = req.params;
  const {nome, sobrenome, dtnasci} = req.body;

  try{
      res.json(await userService.update({id_usuario, nome, sobrenome, dtnasci}))
  } catch (error){
      res.status(500).json(error)
  }

}

const getDados = async (req, res) =>{
  try{
    const {id_usuario} = req.params;
    const {rows} = await pool.query('SELECT * FROM usuario WHERE id_usuario = $1',
    [req.params.id_usuario]);

    return res.status(200).send(rows)
  }
  catch(err){
    return res.status(400).send(err)
  }
}

const ValEmail = async (req, res) =>{
  const { email } = req.body;
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error ao adquirir o cliente', err.stack)
    }
    client.query('SELECT id_usuario FROM usuario WHERE email = $1', 
    [req.body.email], (err, results, fields) => {
      release();
      if (err) {
        return console.error('Erro ao executar a query', err.stack);
      }
      if (results.rows.length > 0) {
        return res.status(200).send({ id_usuario: results.rows[0].id_usuario })
      }
    })
  })
}
/*
  const { email } = req.body;
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error ao adquirir o cliente', err.stack)
    }
    client.query('SELECT * FROM usuario WHERE email = $1', [req.body.email], (err, results, fields) => {
      release();
      if (err) {
        return console.error('Erro ao executar a query', err.stack);
      }
      if (results.rows.length > 1) {
        return res.status(200).send({ mensagem: 'Email Verificado!' })
      }
});
})
*/


const forgetPass = async (req, res) =>{
  const {id_usuario} = req.params;
  const {senha} = req.body;

  try{
    
      res.json(await userService.forgetPass({
        mensagem: 'Senha alterada com sucesso!',
        id_usuario, senha}))
  
  } catch (error){
      res.status(500).json(error)
  }

}


module.exports = { createUser, login, getDados, update, ValEmail, forgetPass } 