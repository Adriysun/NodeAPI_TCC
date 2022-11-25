const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();
const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: {
        rejectUnauthorized: false
      }
})


const update = async ({id_usuario, nome, sobrenome, dtnasci}) => {
    const {rows} = await pool.query('UPDATE usuario SET nome = $1, sobrenome = $2, dtnasci = $3 WHERE id_usuario = $4 returning nome, sobrenome, dtnasci',
    [nome, sobrenome, dtnasci, id_usuario])

    return rows
}

const forgetPass = async ({id_usuario, senha}) => {

    const {rows} = pool.query('UPDATE usuario SET senha = $1 WHERE id_usuario = $2',
    [senha, id_usuario])

    return rows
}


module.exports = {
    update, forgetPass
}