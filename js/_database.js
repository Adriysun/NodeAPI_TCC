const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

// Conexão com o Banco de Dados
const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: {
        rejectUnauthorized: false
      }
})

pool.on('connect', () => {
  console.log('Base de Dados conectado com sucesso!');
});


module.exports = {
  query: (text, params) => pool.query(text, params),
}