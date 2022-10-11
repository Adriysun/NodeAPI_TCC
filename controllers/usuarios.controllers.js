const db = require("../js/_database");

// const bcrypt = require('bcrypt');
// const jwt  = require('jsonwebtoken');

// Método responsável pelo cadastramento de usuários

exports.createUser = async (req, res) => {
    //const { cpf, id_email, nome, sobrenome, senha, dtnasci} = req.body;
    bcrypt.hash(req.body.senha, 10, (errBcrypt, hash) =>{
      if (errBcrypt){return res.status(500).send({ error: error})}
    })
    const { rows } = await db.query(
      'INSERT INTO usuario (cpf, id_email, nome, sobrenome, senha, dtnasci) VALUES ($1, $2, $3, $4, $5, $6)',
      [req.body.cpf, id_email, nome, sobrenome, hash, dtnasci]
    );

    res.status(201).send({
        message: "Usuario cadastrado com sucesso!",
        body: {
          user: {cpf, id_email, nome, sobrenome, senha, dtnasci}
        },
      });

      console.log("Usuário cadastrado com sucesso!");
    };

    // É NECESSÁRIO INSTALAR A BIBLIOTECA JWT E O BCRYPT
    // npm install --save bcrypt
    // npm install jsonwebtoken --save
exports.loginUser = async (req, res) =>{
  const {id_email} = req.body;
  const { rows } = await db.query('SELECT * FROM usuario WHERE id_email = $1',
  [id_email], results);
  if (results.length < 1){
    return res.status(401).send({mensagem: 'Verifique seu email e tente novamente!'})
  }
  bcrypt.compare(req.body.senha, results[0].senha, (err, results) =>{
    if (err) {
      return res.status(401).send({mensagem: 'Falha na autenticação(2)'})
    }
    if (results) {
      /* Efetuar testes com o JWT somente se toda a autenticação funcionar
      let token = jwt.sign({
      cpf: results[0].cpf,
      id_email: results[0].email
      }, 
      process.env.JWT_KEY,
      {
        expiresIn: "1h"
      });
      */
     // INSERIR NO ENV --> JWT_KEY = segredo
      return res.status(200).send({
        mensagem: 'Autenticado com sucesso!'
        // token: token
      });
      
    }
    return res.status(401).send({mensagem: 'Verifique sua senha e tente novamente!'})
  });
}

// https://www.youtube.com/watch?v=A-c643zCW7E (login)
// https://www.youtube.com/watch?v=aVAl8GzS0d0 (cadastro with hash)