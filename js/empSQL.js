const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();
const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: {
        rejectUnauthorized: false
      }
})


const update = async ({id_empresa, razao_social, nome_fantasia, dtfund}) => {
    const {rows} = await pool.query('UPDATE empresa SET razao_social = $1, nome_fantasia = $2, dtfund = $3 WHERE id_empresa = $4 returning razao_social, nome_fantasia, dtfund',
    [razao_social, nome_fantasia, dtfund, id_empresa])

    return rows
}

const forgetPass = async ({id_empresa, senha}) => {

    const {rows} = await pool.query('UPDATE empresa SET senha = $1 WHERE id_empresa = $2 returning senha, id_empresa',
    [senha, id_empresa])

    return rows
}


module.exports = {
    update, forgetPass
}