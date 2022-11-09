const { Pool } = require('pg');
const jwt = require('jsonwebtoken');
const bcrypt = require ('bcrypt');
const express = require ('express');
const router = express.Router();

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: {
        rejectUnauthorized: false
      }
})

const createUser = async (req, res) =>{
    pool.connect((err, client, release) =>{
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
              res.status(409).send({ mensagem: 'Usuário já cadastrado' })
              console.log('Usuário já cadastrado')
            }
            else {
              bcrypt.hash(req.body.senha, 10, (errBcrypt, hash) => {
                if (errBcrypt) { return res.status(500).send({ error: errBcrypt }); }
                client.query('INSERT INTO usuario (cpf, email, nome, sobrenome, senha, dtnasci) VALUES ($1, $2, $3, $4, $5, $6)',
                  [req.body.cpf, email, nome, sobrenome, hash, dtnasci]);
    
                return res.status(201).send({
                  mensagem: 'Usuário criado com sucesso (AMEM)',
                  usuarioCriado: { cpf, email, nome, sobrenome, dtnasci }
                });
              });
              console.log("Usuário cadastrado com sucesso!");
            }
          })
      })
}

const login = async (req, res) =>{
  pool.connect((err, client, release) =>{
    if (err) {
      return console.error('Error ao adquirir o cliente', err.stack)
    }
    const query = 'SELECT * FROM usuario WHERE email = $1'
    client.query(query, [req.body.email], (err, results, fields) => {
        release();
        if (err) {
          return console.error('Erro ao executar a query', err.stack);
        }
        if (results.rows.length < 1) {
          return res.status(401).send({ mensagem: 'Falha na autenticação1' })
        }
        bcrypt.compare(req.body.senha, results.rows[0].senha, (err, result) => {
          if (err) {
            return res.status(401).send({ mensagem: 'Falha na autenticação2' })
          }
          if (result) {
            // talvez usar esse const como parametro tbm para passar na rota com req.params?
            let id = req.params.id_usuario
            const armazenado = {
              id_usuario: results.rows[0].id_usuario,
              email: results.rows[0].email
            }
           // process.env.JWT_KEY,
           // {
             // expiresIn: "1h"
            //})
            console.log('Autenticado com sucesso!');
            return res.status(200).send({
              id_usuario: results.rows[0].id_usuario,
              mensagem: 'Autenticado com sucesso!',
              token: armazenado 
            });
          }
          console.log('Senha Incorreta!')
          return res.status(401).send({ mensagem: 'Senha Incorreta' })
        })
      });
  })
}
/*
const login = async (login) =>{
  pool.connect((err, client, release) =>{
    if (err) {
      return console.error('Error ao adquirir o cliente', err.stack)
    }
    try{
    const sql = client.query('SELECT id_usuario, nome, sobrenome, email, senha FROM usuario WHERE email = $1 AND senha $1 ')
    const dados = [login.email, login.senha]
    const linhas = client.query(sql, dados);

    return linhas;
    
    }catch(error){
      console.log(error);
      return false;
    }
  })

}
*/


router.get('/login', (req, res, next) =>{
  pool.connect((err, client, release) =>{
    if (err) {
      return console.error('Error ao adquirir o cliente', err.stack)
    }
    client.query('SELECT id_usuario, nome, sobrenome, email, senha FROM usuario WHERE email = $1 AND senha $1',
    [req.body.email, senha])
  })

  res.status(200).send
  ({mensagem: "Usuario autenticado"
    
});
});



module.exports = {createUser, login} 