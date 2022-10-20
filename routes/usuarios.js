const router = require('express-promise-router')();
const userController = require('../controllers/usuarios.controllers');
const db = require("../js/_database");
const bcrypt = require ('bcrypt');

// Rota de cadastro de usuarios
router.post('/cadastro_Usuario', userController.createUser);
/*
async (req, res, next ) => {
const {cpf, email, nome, sobrenome, senha, dtnasci} = req.body;
  bcrypt.hash(req.body.senha, 10, (errBcrypt, hash) =>{
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
});
*/
router.post('/login_Usuario', userController.loginUser);

module.exports = router;