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

// Teste de conexão com o banco
pool.connect((err, client, release) => {
  if (err) {
    return console.error('erro ao pegar o cliente', err.stack)
  }
  client.query('SELECT NOW()', (err, result) => {
    release()
    if (err) {
      return console.error('erro ao executar a query', err.stack)
    }
    console.log('Conectado com sucesso', result.rows)
  })
})


