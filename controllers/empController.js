const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: {
        rejectUnauthorized: false
    }
})

const createEmp = async (req, res) => {
    const {razao_social, nome_fantasia, cnpj, email_emp, senha, atv_eco, dtfund} = req.body;
    pool.connect((err, client, release) => {
      if (err) {
        return console.error('Error ao adquirir o cliente', err.stack)
      }
      client.query('SELECT * FROM empresa WHERE email_emp = $1', [req.body.email_emp],
        (err, result) => {
          release();
          if (err) {
            return console.error('Erro ao executar a query', err.stack);
          }
          if (result.rows.length > 0) {
            res.status(409).send({ mensagem: 'Empresa já cadastrada' })
            console.log('Empresa já cadastrado')
          }
          else {
            bcrypt.hash(req.body.senha, 10, (errBcrypt, hash) => {
              if (errBcrypt) { return res.status(500).send({ error: errBcrypt }); }
              client.query('INSERT INTO empresa (razao_social, nome_fantasia, cnpj, email_emp, senha, atv_eco, dtfund) VALUES ($1, $2, $3, $4, $5, $6, $7)',
                [req.body.razao_social, nome_fantasia, cnpj, email_emp, senha, atv_eco, dtfund]);
  
              return res.status(201).send({
                mensagem: 'Empresa cadastrada com sucesso!',
                EmpresaCriada: { razao_social, nome_fantasia, cnpj, email_emp, atv_eco, dtfund}
              });
            });
            console.log("Empresa cadastrada com sucesso!");
          }
        })
    })
  }

const login = async (req, res) => {
    const { email_emp, senha }= req.params;
    pool.connect((err, client, release) => {
      if (err) {
        return console.error('Error ao adquirir o cliente', err.stack)
      }
      const query = 'SELECT * FROM empresa WHERE email_emp = $1';
      client.query(query, [req.params.email_emp], (err, results, fields) => {
          release();
          if (err) {
            return console.error('Erro ao executar a query', err.stack);
          }
          if (results.rows.length < 1) {
            return res.status(401).send({ mensagem: 'Falha na autenticação' })
          }
          bcrypt.compare(req.params.senha, results.rows[0].senha, (err, result) => {
            if (err) {
              return res.status(401).send({ mensagem: 'Falha na autenticação' })
            }
            if (result) {
                const Id_Armazenado = {
                    id_empresa: results.rows[0].id_empresa,
                   nome_fantasia: results.rows[0].nome_fantasia
                  }
              console.log('Autenticado com sucesso!');
              return res.status(200).send({ 
                mensagem: 'Autenticado com sucesso!' ,
                tokenEmp: Id_Armazenado});
            }
            console.log('Senha Incorreta!')
            return res.status(401).send({ mensagem: 'Senha Incorreta' })
          })
        });
    })
}

module.exports = { createEmp, login }