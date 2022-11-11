const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: {
        rejectUnauthorized: false
    }
})

const retornaAguaUser = async (req, res) => {
    const { id_reservuser } = req.params;
    pool.connect((err, client, release) => {
        if (err) {
            return console.error('Error ao adquirir o cliente', err.stack)
        }
        const query = ('SELECT id_aguauser, turbidez FROM aguauser WHERE id_reservuser = $1');
        client.query(query, [req.params.id_reservuser], (err, result) => {
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

const retornaAguaEmp = async (req, res) => {
    const { id_reservemp } = req.params;
    pool.connect((err, client, release) => {
        if (err) {
            return console.error('Error ao adquirir o cliente', err.stack)
        }
        const query = ('SELECT id_aguaemp, turbidez FROM aguaemp WHERE id_reservemp = $1');
        client.query(query, [req.params.id_reservemp], (err, result) => {
            release();
            if (err) {
                return console.error('Erro ao executar a query', err.stack);
            }
            if (result) {
                const agua = {
                    turbidez: result.rows[0].turbidez
                }

                const Id_Armazenado = {
                    Id_agua: result.rows[0].id_aguaemp
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

const incluiAguaUser = async (req, res) => {
    const { id_reservuser, turbidez } = req.body
   // const { id_reservuser } = req.params
    pool.connect((err, client, release) => {
        if (err) {
            return console.error('Error ao adquirir o cliente', err.stack)
        }
        client.query('INSERT INTO aguauser (id_reservuser, turbidez) VALUES ($1, $2)',
            [req.body.id_reservuser, turbidez],  (err, result) => {
                release();
                if (err) {
                    return console.error('Erro ao executar a query', err.stack);
                }
                if (result) {
                    return res.status(200).send({
                        message: 'Informação referente a turbidez inserida!',
                        Sensor_Info: {id_reservuser, turbidez}
                    })
                }
            });
            console.log('Informação referente a turbidez inserida!')
    })
}

const incluiAguaEmp = async (req, res) => {
    const { id_reservemp, turbidez } = req.body
   // const { id_reservemp } = req.params
    pool.connect((err, client, release) => {
        if (err) {
            return console.error('Error ao adquirir o cliente', err.stack)
        }
        client.query('INSERT INTO aguauser (id_reservuser, turbidez) VALUES ($1, $2)',
            [req.body.id_reservemp, turbidez],  (err, result) => {
                release();
                if (err) {
                    return console.error('Erro ao executar a query', err.stack);
                }
                if (result) {
                    return res.status(200).send({
                        message: 'Informação referente a turbidez inserida!',
                        Sensor_Info: {id_reservemp, turbidez}
                    })
                }
            });
            console.log('Informação referente a turbidez inserida!')
    })
}



module.exports = { retornaAguaUser, retornaAguaEmp, incluiAguaUser, incluiAguaEmp }