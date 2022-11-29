const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const empService = require('../services/empService');

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: {
        rejectUnauthorized: false
    }
})

const createEmp = async (req, res) => {
    const {razao_social, nome_fantasia, cnpj, email, senha, atv_eco, dtfund} = req.body;
    pool.connect((err, client, release) => {
      if (err) {
        return console.error('Error ao adquirir o cliente', err.stack)
      }
      client.query('SELECT * FROM empresa WHERE email = $1', [req.body.email],
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
              client.query('INSERT INTO empresa (razao_social, nome_fantasia, cnpj, email, senha, atv_eco, dtfund) VALUES ($1, $2, $3, $4, $5, $6, $7)',
                [req.body.razao_social, nome_fantasia, cnpj, email, senha, atv_eco, dtfund]);
  
              return res.status(201).send({
                mensagem: 'Empresa cadastrada com sucesso!',
                EmpresaCriada: { razao_social, nome_fantasia, cnpj, email, atv_eco, dtfund}
              });
            });
            console.log("Empresa cadastrada com sucesso!");
          }
        })
    })
}

const login = async (req, res) => {
    const { email, senha }= req.params;
    pool.connect((err, client, release) => {
      if (err) {
        return console.error('Error ao adquirir o cliente', err.stack)
      }
      const query = 'SELECT * FROM empresa WHERE email = $1';
      client.query(query, [req.params.email], (err, results, fields) => {
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

const getDados = async (req, res) =>{
  try{
    const {id_empresa} = req.params;
    const {rows} = await pool.query('SELECT * FROM empresa WHERE id_empresa = $1',
    [req.params.id_empresa]);

    return res.status(200).send(rows)
  }
  catch(err){
    return res.status(400).send(err)
  }
}

const ValEmail = async (req, res) =>{
  const { email } = req.body;
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error ao adquirir o cliente', err.stack)
    }
    client.query('SELECT id_empresa FROM empresa WHERE email = $1', 
    [req.body.email], (err, results, fields) => {
      release();
      if (err) {
        return console.error('Erro ao executar a query', err.stack);
      }
      if (results.rows.length > 0) {
        return res.status(200).send({ id_empresa: results.rows[0].id_empresa })
      } else {
        return res.status(204).send({mensagem: 'Email não encontrado'})
      } 
    })
  })
}

const update = async (req, res) =>{
  const {id_empresa} = req.params;
  const {razao_social, nome_fantasia, dtfund} = req.body;

  try{
      res.json(await empService.update({id_empresa, razao_social, nome_fantasia, dtfund}))
  } catch (error){
      res.status(500).json(error)
  }

}

const forgetPass = async (req, res) =>{
  const {id_empresa} = req.params;
  const {senha} = req.body;

  try{
      res.json(await empService.forgetPass({id_empresa, senha}))
  
  } catch (error){
      res.status(500).json(error)
  }

}
module.exports = { createEmp, login, ValEmail, getDados, update, forgetPass }