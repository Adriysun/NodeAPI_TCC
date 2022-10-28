const router = require('express-promise-router')();
const userController = require('../controllers/usuarios.controllers');
const bcrypt = require ('bcrypt');
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
      rejectUnauthorized: false
    }
})


// Rota de cadastro de usuarios
router.post('/cadastro_usuarios', (req, res, next) => {
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
})

router.post('/login_usuarios', (req, res, next) => {
  const { email }= req.body;
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error ao adquirir o cliente', err.stack)
    }
    const query = 'SELECT * FROM usuario WHERE email = $1';
    client.query(query, [req.body.email], (err, results, fields) => {
        release();
        if (err) {
          return console.error('Erro ao executar a query', err.stack);
        }
        if (results.rows.length < 1) {
          return res.status(401).send({ mensagem: 'Falha na autenticação' })
        }
        bcrypt.compare(req.body.senha, results[0].senha, (err, result) => {
          //console.log(results)
          if (err) {
            return res.status(401).send({ mensagem: 'Falha na autenticação2' })
          }
          if (result) {
            console.log('DEU TUDO CERTO');
            return res.status(200).send({ mensagem: 'Autenticado com sucesso' });
          }
          return res.status(401).send({ mensagem: 'Falha na autenticação3' })
        })
      });
  })
});

module.exports = router;