const db = require("../js/_database");
const bcrypt = require('bcrypt');

// Método responsável pelo cadastramento de usuários

exports.createUser = async (req, res, next) => {
  const { cpf, email, nome, sobrenome, senha, dtnasci } = req.body;
  bcrypt.hash(req.body.senha, 10, (errBcrypt, hash) => {
    if (errBcrypt) { return res.status(500).send({ error: errBcrypt }); }
    db.query('INSERT INTO usuario (cpf, email, nome, sobrenome, senha, dtnasci) VALUES ($1, $2, $3, $4, $5, $6)',
      [cpf, email, nome, sobrenome, hash, dtnasci]);

      //(error, results) => {
      //  db.release();
      //  if (error) { return res.status(500).send({ error: error }) }
        return res.status(201).send({
          mensagem: 'Usuário criado com sucesso (AMEM)',
      //    id_usuario: results.insertId,
          usuarioCriado: { cpf, email, nome, sobrenome, dtnasci }
        });
     // });
  });
}




exports.loginUser = async (req, res, next) => {
  const { email } = req.body;
  const query = 'SELECT * FROM usuario WHERE email = $1';
  db.query(query, [email], (error, results, fields) => {
    db.release();
    if (error) { return res.status(500).send({ error: error }) }
    //    if (results.length < 1) {
    //      return res.status(401).send({mensagem: 'Falha na autenticação'})
    //    }
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
  })

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