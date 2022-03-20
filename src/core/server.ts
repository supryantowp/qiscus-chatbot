import express from 'express'
import router from '../handler/webhook'

export function createServer() {
    const app = express()

    app.use(express.json())
    app.use('/webhook', router)

    return app
}