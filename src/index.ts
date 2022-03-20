require('dotenv').config()
import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { createServer } from './core/server'
import config from './orm/database'

async function start() {
    const server = createServer()
    const PORT = process.env.PORT || 3333

    createConnection(config).then((_connection) => {
        server.listen(PORT, () => {
            console.log(`Appliaction running on port ${PORT}`)
        })
    }).catch((err) => {
        console.log('Unable to connect to db', err)
        process.exit(1)
    })
}

start()