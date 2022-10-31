const router = require('express-promise-router')();
const { Pool } = require('pg');

// Determinada conexão com o banco
const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: {
        rejectUnauthorized: false
      }
})

// AINDA NÃO FUNCIONAL!!!


// Rota para adicionar reservatorios de empresas
router.post('/reservEmp', (req, res, next) => {
    const { nome_reserv, /*id_empresa*/ local_reserv, cep, data_ultlimp, data_proxlimp, tipo, descricao } = req.body;
    pool.connect((err, client, release) => {
        if (err) {
            return console.error('Error ao adquirir o cliente', err.stack)
          }
        client.query('INSERT INTO reservatorioemp (nome_reserv, local_reserv, cep, data_ultlimp, data_proxlimp, tipo, descricao) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        [req.body.nome_reserv, local_reserv, cep, data_ultlimp, data_proxlimp, tipo, descricao]);

        res.status(201).send({
            message: "Reservatório adicionado!",
            body: {
              Reservatorio: {nome_reserv, local_reserv, cep, data_ultlimp, data_proxlimp, tipo, descricao}
            },
          });
    
          console.log("Reservatório adicionado!");
  });
});

// Rota para adicionar reservatorios de usuarios
router.post('/reservUser', (req, res, next) => {
    const { nome_reserv, /*id_usuarios*/ local_reserv, cep, data_ultlimp, data_proxlimp, tipo, descricao } = req.body;
    pool.connect((err, client, release) => {
        if (err) {
            return console.error('Error ao adquirir o cliente', err.stack)
          }
        client.query('INSERT INTO reservatoriouser (nome_reserv, local_reserv, cep, data_ultlimp, data_proxlimp, tipo, descricao) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        [req.body.nome_reserv, local_reserv, cep, data_ultlimp, data_proxlimp, tipo, descricao]);

        res.status(201).send({
            message: "Reservatório adicionado!",
            body: {
              Reservatorio: {nome_reserv, local_reserv, cep, data_ultlimp, data_proxlimp, tipo, descricao}
            },
          });
    
          console.log("Reservatório adicionado!");
  });
});

module.exports = router;