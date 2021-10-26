const { v4: uuidv4 } = require('uuid');

const client = require("../db/config")

client.connect()

module.exports = {
    async get(){
        const data = await client.query(`SELECT uuid, description, value, date FROM budget`)

        return data;
    },

    async getSingle(uuid){
        const data = await client.query(`SELECT uuid, description, value, date FROM budget WHERE uuid = '${uuid}'`)

        return data;
    },

    async post(transaction){
        const { description, amount, date } = transaction
        const uuid = uuidv4()
        await client.query(`INSERT INTO budget (uuid, description, value, date) VALUES ( '${uuid}','${description}', ${amount}, '${date}');`)

        return "Post successfully"
    },

    async update(transaction, uuid) {
        const { description, amount, date } = transaction
        await client.query(`UPDATE budget SET description = '${description}', value = ${amount}, date = '${date}' WHERE uuid = '${uuid}'`)
    },

    async delete(uuid) {
        await client.query(`DELETE FROM budget WHERE uuid = '${uuid}'`)

        return "Delete successfully"
    }
}