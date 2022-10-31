const router = require('express-promise-router')();
const bcrypt = require ('bcrypt');
const { Pool } = require('pg');

// Determinada conexão com o banco
const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: {
        rejectUnauthorized: false
      }
})

// Rota de cadastro de empresas
router.post('/cadastro_empresas', (req, res, next) => {
    const { razao_social, nome_fantasia, cnpj, email_emp, senha, atv_eco, dtfund } = req.body;
    pool.connect((err, client, release) => {
      if (err) {
        return console.error('Error ao adquirir o cliente', err.stack)
      }
      client.query('SELECT * FROM empresa WHERE email_emp = $1', [req.body.email_emp],
        (err, result) => {
          release();
          if (err) {
            return console.error('Erro ao executar a query', err.stack);
          }
          if (result.rows.length > 0) {
            res.status(409).send({ mensagem: 'Empresa já cadastrada' })
            console.log('Empresa já cadastrada')
          }
          else {
            bcrypt.hash(req.body.senha, 10, (errBcrypt, hash) => {
              if (errBcrypt) { return res.status(500).send({ error: errBcrypt }); }
              client.query('INSERT INTO empresa (razao_social, nome_fantasia, cnpj, email_emp, senha, atv_eco, dtfund) VALUES ($1, $2, $3, $4, $5, $6, $7)',
                [req.body.razao_social, nome_fantasia, cnpj, email_emp, hash, atv_eco, dtfund]);
  
              return res.status(201).send({
                mensagem: 'Empresa cadastrada com sucesso!',
                EmpresaCriada: { razao_social, nome_fantasia, cnpj, email_emp, atv_eco, dtfund }
              });
            });
            console.log("Empresa cadastrada com sucesso!");
          }
        })
    })
  })
  
  //Rota de login de empresas
  router.post('/login_empresas', (req, res, next) => {
    const { email_emp }= req.body;
    pool.connect((err, client, release) => {
      if (err) {
        return console.error('Error ao adquirir o cliente', err.stack)
      }
      const query = 'SELECT * FROM empresa WHERE email_emp = $1';
      client.query(query, [req.body.email_emp], (err, results, fields) => {
          release();
          if (err) {
            return console.error('Erro ao executar a query', err.stack);
          }
          if (results.rows.length < 1) {
            return res.status(401).send({ mensagem: 'Falha na autenticação' })
          }
          bcrypt.compare(req.body.senha, results.rows[0].senha, (err, result) => {
            if (err) {
              return res.status(401).send({ mensagem: 'Falha na autenticação' })
            }
            if (result) {
              console.log('Autenticado com sucesso!');
              return res.status(200).send({ mensagem: 'Autenticado com sucesso!' });
            }
            console.log('Senha Incorreta!')
            return res.status(401).send({ mensagem: 'Senha Incorreta' })
          })
        });
    })
  });
  
  module.exports = router;


module.exports = router;