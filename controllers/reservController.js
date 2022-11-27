const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: {
        rejectUnauthorized: false
    }
})
// ----------------------------------------------------------------- //

const retornaReservatorio = async (req, res) =>{
    try{
        const {id_user} = req.params;

        const {rows}  = await pool.query('SELECT * FROM reservatorios WHERE id_user = $1',  
        [req.params.id_user])
        
        return res.status(200).json(rows);
    } catch(err) {
        return res.status(400).send(err)
    }
}

const incluirReservatorio= async (req, res) => {
    const {nome, id_user, local, cep, dt_ult, dt_prox, tipo, descricao} = req.body;    
        pool.connect((err, client, release) => {
            if (err) {
                return console.error('Error ao adquirir o cliente', err.stack)
            }
            client.query('INSERT INTO reservatorios (nome, id_user, local, cep, dt_ult, dt_prox, tipo, descricao) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
                [req.body.nome, id_user, local, cep, dt_ult, dt_prox, tipo, descricao]); //[req.params.id_usuario]);
            res.status(201).send({
                message: "Reservatório adicionado!",
                body: {
                    Reservatorio: {nome, id_user, local, cep, dt_ult, dt_prox, tipo, descricao}
                },
            });
            console.log('Reservatório adicionado!')
        })
}

module.exports = {incluirReservatorio, retornaReservatorio}

// -------------------------- Não usamos mais ----------------------------------------------------------

/*
const reservService = require ('../services/reservService');

const incluiReservUser = async (req, res) =>{
    const {nome_reserv, id_usuario,  local_reserv, cep, data_ultlimp, data_proxlimp, tipo, descricao} = req.body;

  if(!nome_reserv){
    return res.status(400).json({Error: 'O Nome não pode ficar vazio'})
  }
    try{
        res.status(201).json(await reservService.incluir({nome_reserv, id_usuario,  local_reserv, cep, data_ultlimp, data_proxlimp, tipo, descricao}))
    } catch (error){
        res.status(500).json(error)
    }
  
  }

const incluiReservUser = async (req, res) => {
    const {nome_reserv, id_usuario, local_reserv, cep, data_ultlimp, data_proxlimp, tipo, descricao} = req.body;    
        pool.connect((err, client, release) => {
            if (err) {
                return console.error('Error ao adquirir o cliente', err.stack)
            }
            client.query('INSERT INTO reservatoriouser (nome_reserv, id_usuario, local_reserv, cep, data_ultlimp, data_proxlimp, tipo, descricao) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
                [req.body.nome_reserv, id_usuario, local_reserv, cep, data_ultlimp, data_proxlimp, tipo, descricao]); //[req.params.id_usuario]);
            res.status(201).send({
                message: "Reservatório adicionado!",
                body: {
                    Reservatorio: { nome_reserv, id_usuario, local_reserv, cep, data_ultlimp, data_proxlimp, tipo, descricao }
                },
            });
            console.log('Reservatório adicionado!')
        })
}


const incluiReservEmp = async (req, res) => {
    const {nome_reserv, id_empresa, local_reserv, cep, data_ultlimp, data_proxlimp, tipo, descricao} = req.body;
    // const {id_empresa} = req.params;
        pool.connect((err, client, release) => {
            if (err) {
                return console.error('Error ao adquirir o cliente', err.stack)
            }
            client.query('INSERT INTO reservatorioemp (nome_reserv, id_empresa, local_reserv, cep, data_ultlimp, data_proxlimp, tipo, descricao) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
                [req.body.nome_reserv, id_empresa, local_reserv, cep, data_ultlimp, data_proxlimp, tipo, descricao]); //[req.params.id_empresa])

            res.status(201).send({
                message: "Reservatório adicionado!",
                body: {
                    Reservatorio: { nome_reserv, id_empresa, local_reserv, cep, data_ultlimp, data_proxlimp, tipo, descricao }
                },
            });
            console.log('Reservatório adicionado!')
        })
}
<<<<<<< Updated upstream
=======
const retornaReservEmp = async (req, res) => {
    const id_empresa = req.params;
    pool.connect((err, client, release) => {
        if (err) {
            return console.error('Error ao adquirir o cliente', err.stack)
        }
        const {rows} = ('SELECT id_reservemp, nome_reserv, id_empresa, local_reserv, cep, data_ultlimp, data_proxlimp, tipo, descricao FROM reservatorioemp WHERE id_empresa = $1');
        client.query(rows, [req.params.id_empresa], (err, result) => {
            release();
            if (err) {
                return console.error('Erro ao executar a query', err.stack);
            }
            if (result) {
                const reservatorio = {
                    IdReserv: result.rows[0].id_reservemp,
                    Nome: result.rows[0].nome_reserv,
                    IdEmpresa: result.rows[0].id_empresa,
                    Local: result.rows[0].local_reserv,
                    CEP: result.rows[0].cep,
                    DataUltimaLimpeza: result.rows[0].data_ultlimp,
                    DataProximaLimpeza: result.rows[0].data_proxlimp,
                    Tipo: result.rows[0].tipo,
                    Descrição: result.rows[0].descricao,
                }

                const id_reserv = {
                    IdReserv: result.rows[0].id_reservemp,
                }
                return res.status(200).send({
                  //  message: 'Retornando reservatório referente ao ID da Empresa',
                    reservatorio,
                  //  tokenReserv: id_reserv
                });
            }
        })
        console.log('Retornando reservatorio referente ao ID empresa')
    });
}
*/
>>>>>>> Stashed changes


//https://www.linkedin.com/pulse/entendendo-parâmetros-em-requisições-de-uma-vez-por-todas-henrique/?originalSubdomain=pt

<<<<<<< Updated upstream
module.exports = { retornaReservUser, retornaReservEmp, incluiReservUser, incluiReservEmp}
=======
>>>>>>> Stashed changes
