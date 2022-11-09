const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: {
        rejectUnauthorized: false
    }
})


// testar esse primeiro para descobrir como retorno os reservatórios
const retornaReserv = async (req, res) => {
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
                return res.status(200).send({
                    message: 'Retornando reservatório referente ao ID do usuário',
                    tokenReserv: reservatorio
                });



            }

        })
    });

    const incluiReserv = async (req, res) => {
        pool.connect((err, client, release) => {
            if (err) {
                return console.error('Error ao adquirir o cliente', err.stack)
            }
            client.query('INSERT INTO reservatoriouser (nome_reserv, local_reserv, cep, data_ultlimp, data_proxlimp, tipo, descricao) VALUES ($1, $2, $3, $4, $5, $6, $7)',
                [req.body.nome_reserv, local_reserv, cep, data_ultlimp, data_proxlimp, tipo, descricao]);

            res.status(201).send({
                message: "Reservatório adicionado!",
                body: {
                    Reservatorio: { nome_reserv, local_reserv, cep, data_ultlimp, data_proxlimp, tipo, descricao }
                },
            });
            console.log('Reservatório adicionado!')
        })
    }





    //insert into reservatoriouser (nome_reserv, id_usuario, local_reserv, cep, data_ultlimp, data_proxlimp, tipo, descricao) 
    //values ('CaixaDágua', 79, 'São Paulo', 13554478, '02/12/2022', '04/01/2023', 'Casa', 'Reservatorio da Casa dos fundos')

    //https://www.linkedin.com/pulse/entendendo-parâmetros-em-requisições-de-uma-vez-por-todas-henrique/?originalSubdomain=pt
}

module.exports = { retornaReserv, incluiReserv }