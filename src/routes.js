const express = require('express')
const routes = express.Router()
const TransactionController = require('./controllers/TransactionController')
const Auth = require('./middlewares/auth')

routes.get('/', TransactionController.show)
routes.get('/:uuid', TransactionController.showSingle)
routes.post('/create', Auth.verifyJWT, TransactionController.create)
routes.put('/transaction/:uuid', Auth.verifyJWT, TransactionController.update)
routes.delete('/transaction/delete/:uuid', Auth.verifyJWT, TransactionController.delete)

module.exports = routes;
