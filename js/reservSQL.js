const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: {
        rejectUnauthorized: false
      }
})



const incluir = async ({nome_reserv, id_usuario, local_reserv, cep, data_ultlimp, data_proxlimp, tipo, descricao}) =>{
    const response = pool.query('INSERT INTO reservatoriouser (nome_reserv, id_usuario, local_reserv, cep, data_ultlimp, data_proxlimp, tipo, descricao) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) returning *',
    [nome_reserv, id_usuario, local_reserv, cep, data_ultlimp, data_proxlimp, tipo, descricao])

    return response.rows[0]
}

module.exports = {incluir}