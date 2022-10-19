const db = require("../js/_database");
const bcrypt = require ('bcrypt');

// Método responsável pelo cadastramento de usuários

exports.createUser = async (req, res) => {
  const {cpf, email, nome, sobrenome, senha, dtnasci} = req.body;
  bcrypt.hash(req.body.senha, 15, (errBcrypt, hash) =>{
    if (errBcrypt) {return res.status(500).send({ error: errBcrypt})}
      db.query('INSERT INTO usuario (cpf, email, nome, sobrenome, senha, dtnasci) VALUES ($1, $2, $3, $4, $5, $6)',
      [cpf, email, nome, sobrenome, hash, dtnasci],
      (error, results) => {
        db.release();
        if (error) {return res.status(500).send ({error: error})}
        response = {
          mensagem: 'Usuário criado com sucesso (AMEM)',
          usuarioCriado:{
            id_usuario: results.insertId,
            cpf: req.body.cpf,
            email: req.body.email,
            nome: req.body.nome,
            sobrenome: req.body.sobrenome,
            dtnasci: req.body.dtnasci
        }
      }
        return res.status(201).send(response);
      })
  });

  /*
    const { cpf, email, nome, sobrenome, senha, dtnasci} = req.body;
    const { rows } = await db.query(
      'INSERT INTO usuario (cpf, email, nome, sobrenome, senha, dtnasci) VALUES ($1, $2, $3, $4, $5, $6)',
      [cpf, email, nome, sobrenome, senha, dtnasci]
    );

    res.status(201).send({
        message: "Usuario cadastrado com sucesso!",
        body: {
          user: {cpf, email, nome, sobrenome, senha, dtnasci}
        },
      });

      console.log("Usuário cadastrado com sucesso!");
     */ 
    };

exports.loginUser = async (req, res) =>{
  const user = user.findOne({
    attributes: ['id_usuario, email, senha']
  })


  
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
}

// https://www.youtube.com/watch?v=A-c643zCW7E (login)
// https://www.youtube.com/watch?v=aVAl8GzS0d0 (cadastro with hash)