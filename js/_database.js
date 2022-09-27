const pg = require ('pg')
const { Pool } = require('pg')
const pool = require ('../routes/inicial')

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: {
        rejectUnauthorized: false
      }
})

