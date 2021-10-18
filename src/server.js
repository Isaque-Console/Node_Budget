const cors = require('cors')
const express = require('express')
const server = express()
const routes = require('./routes')


server.use(cors())
server.use(express.urlencoded({ extended: true }))
server.use(express.json())
server.use(routes)

const port = 3004
server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})