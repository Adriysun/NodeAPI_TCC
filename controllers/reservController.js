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
                [req.body.nome, id_user, local, cep, dt_ult, dt_prox, tipo, descricao]); 
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
