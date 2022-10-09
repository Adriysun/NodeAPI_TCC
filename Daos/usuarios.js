const db = require("../js/_database");

async function inclua(usuario) {
    try {
        const pg   = 'INSERT INTO usuario (cpf, id_email, nome, sobrenome, senha, dtnasci ) VALUES ($1, $2, $3, $4, $5, $6)';
        const dados = [usuario.CPF, usuario.Email, usuario.Nome, usuario.Sobrenome, usuario.Senha, usuario.DataNasci];
        await db.query (pg, dados);
        return true;
    } catch(error) {
        return false;
    }

}

module.exports = {inclua};