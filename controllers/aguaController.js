const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: {
        rejectUnauthorized: false
    }
})

const retornaAgua = async (req, res) => {
    const { id_reserv } = req.params;
    pool.connect((err, client, release) => {
        if (err) {
            return console.error('Error ao adquirir o cliente', err.stack)
        }
        const query = ('SELECT id_reserv, turbidez FROM agua WHERE id_reserv = $1');
        client.query(query, [req.params.id_reserv], (err, result) => {
            release();
            if (err) {
                return console.error('Erro ao executar a query', err.stack);
            }
            if (result) {
                const agua = {
                    turbidez: result.rows[0].turbidez
                }

                const Id_Armazenado = {
                    Id_agua: result.rows[0].id_aguauser
                }

                return res.status(200).send({
                    message: 'Retornando agua referente ao ID do reservatório',
                    Agua_Info: agua,
                    tokenAgua: Id_Armazenado
                })
            }
        })

    })
}

const incluiAgua = async (req, res) => {
    const { id_reserv, turbidez } = req.body
    pool.connect((err, client, release) => {
        if (err) {
            return console.error('Error ao adquirir o cliente', err.stack)
        }
        client.query('INSERT INTO agua (id_reserv, turbidez) VALUES ($1, $2)',
            [req.body.id_reserv, turbidez],  (err, result) => {
                release();
                if (err) {
                    return console.error('Erro ao executar a query', err.stack);
                }
                if (result) {
                    return res.status(200).send({
                        message: 'Informação referente a turbidez inserida!',
                        Sensor_Info: {id_reserv, turbidez}
                    })
                }
            });
            console.log('Informação referente a turbidez inserida!')
    })
}

module.exports = {retornaAgua, incluiAgua}