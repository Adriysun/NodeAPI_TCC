const db = require("../js/_database");

// Método responsável pelo cadastramento de usuários

exports.createUser = async (req, res) => {
  console.log(cpf, id_email, nome, sobrenome, senha, dtnasci);
    const { cpf, id_email, nome, sobrenome, senha, dtnasci} = req.body;
    const { rows } = await db.query(
      'INSERT INTO usuario (cpf, id_email, nome, sobrenome, senha, dtnasci) VALUES ($1, $2, $3, $4, $5, $6)',
      [cpf, id_email, nome, sobrenome, senha, dtnasci]
    );

    res.status(201).send({
        message: "Usuario cadastrado com sucesso!",
        body: {
          user: {cpf, id_email, nome, sobrenome, senha, dtnasci}
        },
      });

      console.log(cpf, id_email, nome, sobrenome, senha, dtnasci);
    };