const { Pool } = require('pg');
const bcrypt = require('bcrypt');


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
          res.status(409).send({ mensagem: 'Usuário já cadastrado' })
          console.log('Usuário já cadastrado')
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
          // talvez usar esse const como parametro tbm para passar na rota com req.params?
          const Id_Armazenado = {
            id_usuario: results.rows[0].id_usuario,
            //email: results.rows[0].email
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

/*
const update = async (req, res) => {
  const { id_usuario } = req.params;
  const { nome, sobrenome } = req.body;
  try{
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error ao adquirir o cliente', err.stack)
    }
    client.query('UPDATE nome = $1, sobrenome = $2, WHERE id_usuario = $3',
      [req.body.nome, sobrenome], [req.params.id_usuario], (err, result) => {
        release();
        if (err) {
          return console.error('Erro ao executar a query', err.stack);
        }
        if (result.rows.length < 1) {
          res.status(409).send({ mensagem: 'Usuário inexistente' })
          console.log('Usuário inexistente')
        } else {
          return res.status(200).send({
            mensagem: 'Usuario Atualizado!',
            UpdatedUser: { id_usuario, nome, sobrenome }
          })
        }
        console.log('Usuario alterado!')
      })
      return true;
    
  })
}catch (erro){
  console.log(erro)
  return false;
}
}
*/

const update = async (req, res) =>{

  try{
    const {id_usuario} = req.params;
    const {nome, sobrenome} = req.body;

    const {query} = await pool.query('UPDATE usuario SET nome = $1, sobrenome = $2 WHERE id_usuario = $3');
    pool.query(query, [req.params.id_usuario], [req.body.nome, sobrenome]);

    return res.status(200).send({
      mensagem: 'Atualizado!',
      UpdatedUser: {nome, sobrenome}
    })
  }
  catch(err){
    return res.status(400).send(err)
  }

}


module.exports = { createUser, login, update } 