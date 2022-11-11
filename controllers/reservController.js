const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: {
        rejectUnauthorized: false
    }
})


// testar esse primeiro para descobrir como retorno os reservatórios
const retornaReservUser = async (req, res) => {
    const id_usuario = req.params;
    pool.connect((err, client, release) => {
        if (err) {
            return console.error('Error ao adquirir o cliente', err.stack)
        }
        const query = ('SELECT id_reservuser, nome_reserv, id_usuario, local_reserv, cep, data_ultlimp, data_proxlimp, tipo, descricao FROM reservatoriouser WHERE id_usuario = $1');
        client.query(query, [req.params.id_usuario], (err, result) => {
            release();
            if (err) {
                return console.error('Erro ao executar a query', err.stack);
            }
            if (result) {
                const reservatorio = {
                    IdReserv: result.rows[0].id_reservuser,
                    Nome: result.rows[0].nome_reserv,
                    IdUsuario: result.rows[0].id_usuario,
                    Local: result.rows[0].local_reserv,
                    CEP: result.rows[0].cep,
                    DataUltimaLimpeza: result.rows[0].data_ultlimp,
                    DataProximaLimpeza: result.rows[0].data_proxlimp,
                    Tipo: result.rows[0].tipo,
                    Descrição: result.rows[0].descricao,
                }

                const id_reserv = {
                    IdReserv: result.rows[0].id_reservuser,
                }
                return res.status(200).send({
                    message: 'Retornando reservatório referente ao ID do usuário',
                    Reservatorio: reservatorio,
                    tokenReserv: id_reserv
                });
            }
        })
        console.log('Retornando reservatorio referente ao ID usuario')
    });
}

const retornaReservEmp = async (req, res) => {
    const id_empresa = req.params;
    pool.connect((err, client, release) => {
        if (err) {
            return console.error('Error ao adquirir o cliente', err.stack)
        }
        const query = ('SELECT id_reservemp, nome_reserv, id_empresa, local_reserv, cep, data_ultlimp, data_proxlimp, tipo, descricao FROM reservatorioemp WHERE id_empresa = $1');
        client.query(query, [req.params.id_empresa], (err, result) => {
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
                    message: 'Retornando reservatório referente ao ID da Empresa',
                    Reservatorio: reservatorio,
                    tokenReserv: id_reserv
                });
            }
        })
        console.log('Retornando reservatorio referente ao ID empresa')
    });
}


const incluiReservUser = async (req, res) => {
    const {nome_reserv, local_reserv, cep, data_ultlimp, data_proxlimp, tipo, descricao} = req.body;    
    const {id_usuario} = req.params;
        pool.connect((err, client, release) => {
            if (err) {
                return console.error('Error ao adquirir o cliente', err.stack)
            }
            client.query('INSERT INTO reservatoriouser (nome_reserv, id_usuario, local_reserv, cep, data_ultlimp, data_proxlimp, tipo, descricao) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
                [req.body.nome_reserv, local_reserv, cep, data_ultlimp, data_proxlimp, tipo, descricao], [req.params.id_usuario]);
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
    const {nome_reserv, local_reserv, cep, data_ultlimp, data_proxlimp, tipo, descricao} = req.body;
    const {id_empresa} = req.params;
        pool.connect((err, client, release) => {
            if (err) {
                return console.error('Error ao adquirir o cliente', err.stack)
            }
            client.query('INSERT INTO reservatorioemp (nome_reserv, id_empresa, local_reserv, cep, data_ultlimp, data_proxlimp, tipo, descricao) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
                [req.body.nome_reserv, local_reserv, cep, data_ultlimp, data_proxlimp, tipo, descricao], [req.params.id_empresa])

            res.status(201).send({
                message: "Reservatório adicionado!",
                body: {
                    Reservatorio: { nome_reserv, id_empresa, local_reserv, cep, data_ultlimp, data_proxlimp, tipo, descricao }
                },
            });
            console.log('Reservatório adicionado!')
        })
}


//https://www.linkedin.com/pulse/entendendo-parâmetros-em-requisições-de-uma-vez-por-todas-henrique/?originalSubdomain=pt

module.exports = { retornaReservUser, retornaReservEmp, incluiReservUser, incluiReservEmp}