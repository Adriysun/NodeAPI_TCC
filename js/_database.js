const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

/*
async function connect() {
  if (global.connection)
    return global.connection.connect();

  const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  //apenas testando a conexão
  const client = await pool.connect();
  console.log("Criou pool de conexões no PostgreSQL!");

  const res = await client.query('SELECT NOW()');
  console.log(res.rows[0]);
  client.release();

  //guardando para usar sempre o mesmo
  global.connection = pool;
  return pool.connect();
}
*/

//module.exports = Pool;



// Conexão com o Banco de Dados
const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: {
        rejectUnauthorized: false
      }
})

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

/*
pool.on('connect', () => {
  console.log('Base de Dados conectado com sucesso!');
});


module.exports = {
  query: (text, params) => pool.query(text, params)
}
*/