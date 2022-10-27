const db = require("../js/_database");
const bcrypt = require('bcrypt');
const { Pool } = require('pg');


// Método responsável pelo cadastramento de usuários
/*
async function createUser(user){
  const client = await connect();
  const sql = 'INSERT INTO usuario (cpf, email, nome, sobrenome, senha, dtnasci) VALUES ($1, $2, $3, $4, $5, $6);';
  const values = [user.cpf, user.email, user.nome, user.sobrenome, user.senha, user.dtnasci];
  return await client.query(sql, values);
}
*/

async function connect() {
  if (global.connection)
    return global.connection.connect();

  const pool = new Pool({
    connectionString: 'postgres://mtjazyulyfwxqh:1cc67a25a0b9903b59b0ad8f75701631684b13f5b1ac5a3b820692c466136315@ec2-44-206-137-96.compute-1.amazonaws.com:5432/d7ce4r1uh8vjhu',
    ssl: {
      rejectUnauthorized: false
    }
  });

  //apenas testando a conexão
  const client = await pool.connect();
  console.log("Criou pool de conexões no PostgreSQL!");

  const res = await client.query('SELECT NOW()');
  console.log(res.rows[0]);
  client.release();

  //guardando para usar sempre o mesmo
  global.connection = pool;
  return pool.connect();
}

exports.createUser = async function (req, res, next) {
  const { cpf, email, nome, sobrenome, senha, dtnasci } = req.body;
  client = await connect();
  await client.query('SELECT * FROM usuario WHERE email = $1', [req.body.email], (error, results) => {
    if (error) { return res.status(500).send({ error: error }) }
    if (results.length > 0) {
      res.status(409).send({ mensagem: 'Usuário já cadastrado' })
    } else {
      bcrypt.hash(req.body.senha, 10, async function (errBcrypt, hash) {
        if (errBcrypt) { return res.status(500).send({ error: errBcrypt }); }
        await client.query('INSERT INTO usuario (cpf, email, nome, sobrenome, senha, dtnasci) VALUES ($1, $2, $3, $4, $5, $6)',
          [req.body.cpf, email, nome, sobrenome, hash, dtnasci]);

        return es.status(201).send({
          mensagem: 'Usuário criado com sucesso (AMEM)',
          usuarioCriado: { cpf, email, nome, sobrenome, dtnasci }
        });
      });
      console.log("Usuário cadastrado com sucesso!");
    }
  });
}






exports.loginUser = async function (req, res, next) {
  const { email } = req.body;
  //const query = 'SELECT * FROM usuario WHERE email = $1';
  client = await connect();
  await client.query('SELECT * FROM usuario WHERE email = $1', [req.body.email], (error, results) => {
    if (error) { return res.status(500).send({ error: error }) }
    if (results.length < 1) {
      return res.status(401).send({ mensagem: 'Falha na autenticação' })
    }
    bcrypt.compare(req.body.senha, results[0].senha, (err, result) => {
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
}



/*
  const {email} = req.body;
  const results = await db.query('SELECT * FROM usuario WHERE email = $1',
  [email]);
  if (results.length < 1){
    return res.status(401).send({mensagem: 'Verifique seu email e tente novamente!'})
  }
  else {
    res.status(201).send({
      message: "Seja Bem vindo " + email
    });
  }
*/


// https://www.youtube.com/watch?v=A-c643zCW7E (login)
// https://www.youtube.com/watch?v=aVAl8GzS0d0 (cadastro with hash)