const { Client } = require('pg')
const dotenv = require('dotenv')
dotenv.config()

const client = new Client({
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.PASSWORD,
    port: process.env.PORT,
    database: process.env.DATABASE
})

module.exports = client;