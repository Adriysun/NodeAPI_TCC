const pg = require ('pg')
const { Pool } = require('pg')
const pool = require ('../routes/inicial')

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: {
        rejectUnauthorized: false
      }
})


/*
const client = new pg.Client({
    user: 'mtjazyulyfwxqh',
    host: 'ec2-44-206-137-96.compute-1.amazonaws.com',
    database: 'd7ce4r1uh8vjhu',
    password: '1cc67a25a0b9903b59b0ad8f75701631684b13f5b1ac5a3b820692c466136315',
    port: 5432,
})

module.exports = client
*/