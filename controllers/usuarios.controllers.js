const db = require("../js/_database");

// Método responsável pelo cadastramento de usuários

exports.createUser = async (req, res) => {
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
}

// https://www.youtube.com/watch?v=A-c643zCW7E (login)
// https://www.youtube.com/watch?v=aVAl8GzS0d0 (cadastro with hash)