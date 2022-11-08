const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: {
        rejectUnauthorized: false
    }
})


// testar esse primeiro para descobrir como retorno os reservatórios
const retornaReserv = async (req, res) => {
    pool.connect((err, client, release) => {
        if (err) {
            return console.error('Error ao adquirir o cliente', err.stack)
        }
        const query = ('SELECT nome_reserv, local_reserv, cep, data_ultlimp, data_proxlimp, tipo, descricao FROM reservatoriouser WHERE id_usuario = $1');
        client.query(query, [req.body.email, senha], (err, result) => {
            release();
            if (err) {
                return console.error('Erro ao executar a query', err.stack);
            }
            if (result) {
                return res.status(200).send({
                    id_usuario: result.rows.id_usuario,
                    Nome_Reservatorio: result.rpws.nome_reserv,
                    Local: result.rows.local_reserv,
                    CEP: result.rows.cep,
                    Data_Ultima_Limpeza: result.rows.data_ultlimp,
                    Data_Proxima_Limpeza: result.data_proxlimp,
                    Tipo_Reservatorio: result.rows.tipo,
                    Descrição: result.rows.descricao
                });


            }

        })
    });
}

module.exports = {retornaReserv}