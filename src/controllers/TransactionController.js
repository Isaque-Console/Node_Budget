const Transaction = require("../model/Transaction")
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    async show(req, res) {
        const transactions = await Transaction.get();

        if (!transactions){
            return "Não existem transações"
        }

        // Gera o token
        const token = jwt.sign({ id: 1 }, process.env.SECRET, {
            expiresIn: 3600 // expires in 1 hour
        })

        // acrescenta o token na resposta
        transactions["x-access-token"] = token
        
        return res.json(transactions)
    },

    async showSingle(req, res) {
        const uuid = req.params.uuid
        const transaction = await Transaction.getSingle(uuid);

        if (!transaction){
            return "Não existem transações"
        }

        // Gera o token
        const token = jwt.sign({ id: 1 }, process.env.SECRET, {
            expiresIn: 3600 // expires in 1 hour
        })

        // acrescenta o token na resposta
        transaction["x-access-token"] = token
        
        return res.json(transaction)
    },

    async create(req, res) {
        const token = req.headers['x-access-token']

        await Transaction.post(req.body)

        return res.json({ auth: true, token: token})
    },

    async update(req, res) {
        const uuid = req.params.uuid
        const token = req.headers['x-access-token']

        await Transaction.update(req.body, uuid)
        return res.json({ auth: true, token: token})
    },

    async delete(req, res){
        const uuid = req.params.uuid
        const token = req.headers['x-access-token']

        await Transaction.delete(uuid)

        return res.json({ auth: true, token: token})
    }
}
