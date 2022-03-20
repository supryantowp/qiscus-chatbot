import axios, { AxiosInstance } from 'axios'
import { Service } from 'typedi'

@Service()
export class WidgetService {
    private _client: AxiosInstance

    constructor() {
        this._client = axios.create({
            baseURL: `https://multichannel.qiscus.com/${process.env.QISCUS_APP_CODE}/`,
            headers: {
                'Content-Type': 'application/json',
                'QISCUS_SDK_SECRET': process.env.QISCUS_SDK_SECRET!,
            }
        })
    }

    public async sendText(room_id: string, message: string) {
        const payload = {
            sender_email: process.env.QISCUS_SENDER_EMAIL!,
            message: message,
            room_id: room_id,
            type: 'text'
        }

        return await this._client.post("bot", payload)
    }

    public async sendAttachement(room_id: string, message: string, data: any) {
        const payload = {
            sender_email: process.env.QISCUS_SENDER_EMAIL!,
            message: message,
            type: 'file_attachement',
            room_id: room_id,
            payload: data
        }

        return this._client.post('/bot', payload)
    }

    public async sendButton(room_id: string, message: string, data: any) {
        const payload = {
            sender_email: process.env.QISCUS_SENDER_EMAIL!,
            message: message,
            type: 'buttons',
            room_id: room_id,
            payload: data
        }

        return this._client.post('/bot', payload)
    }

    public async sendCarousel(room_id: string, data: any) {
        const payload = {
            sender_email: process.env.QISCUS_SENDER_EMAIL!,
            type: 'carousel',
            room_id: room_id,
            payload: data
        }

        return this._client.post('/bot', payload)
    }
}