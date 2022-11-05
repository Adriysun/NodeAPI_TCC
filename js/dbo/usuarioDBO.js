const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: {
        rejectUnauthorized: false
      }
})

const login = async (login) => {
  pool.connect((err, client, release) =>{
    if (err) {
        return console.error('Error ao adquirir o cliente', err.stack)
      }
    try{
      const sql = 'SELECT id_usuario, nome, email, senha From usuario WHERE email = $1 AND senha = $1 ';
      const dados = [login.email, login.senha];
      const [linhas] = client.query(sql, dados);
  
      return linhas;
      
    } catch(error){
      console.log(error);
      return false;
    }
})
}

module.exports = {login}
