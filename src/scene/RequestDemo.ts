import { Scene } from '../core/Scene'
import { WebhookEvent } from '../types'

export class RequestDemoScene extends Scene {

    public async onText(payload: WebhookEvent): Promise<void> {
        const { room, from } = payload
        const options = JSON.parse(room.options)
        if (options.source !== 'qiscus') return

        this._handleRequestDemo(payload)
    }

    public async onEnter(payload: WebhookEvent): Promise<void> {
        const { room, from } = payload
        const options = JSON.parse(room.options)
        if (options.source !== 'qiscus') return

        this._handleRequestDemo(payload)
    }

    public async onButtonReply(event: WebhookEvent): Promise<void> {
        const { message, room, from } = event

        if (message.text == 'Ubah Nama') {
            this.widget.sendText(room.id_str, 'Silahkan di infokan nama lengkap anda, agar kami dapat menghubungi anda!')
            return this.updateUserScene(from.email, 'UpdateNamaScene')
        } else if (message.text == 'Ubah Email') {
            this.widget.sendText(room.id_str, 'Silahkan masukkan email bisnis anda, agar kami dapat menghubungi anda!')
            return this.updateUserScene(from.email, 'UpdateEmailScene')
        } else {
            return this.loadScene('CreateDemoScene').onEnter(event)
        }
    }

    private async _handleRequestDemo(event: WebhookEvent) {
        const { from, room } = event
        this.updateUserScene(from.email, 'RequestDemoScene')
        const userInfo = this.stateUserInfo.get('user_info')

        await this.widget.sendButton(room.id_str, '', {
            text: `Mohon di infokan apakah nama dan email tersebut sudah benar adanya? Nama: ${userInfo?.full_name} Email Bisnis: ${userInfo?.email_address}`,
            buttons: [
                {
                    label: 'Ubah Nama',
                    type: 'postback',
                    payload: {
                        method: "get",
                        url: "https://insignia.co.id",
                        payload: { type: 'button' }
                    }
                },
                {
                    label: 'Ubah Email',
                    type: 'postback',
                    payload: {
                        method: "get",
                        url: "https://insignia.co.id",
                        payload: { type: 'button' }
                    }
                },
                {
                    label: 'Data Sudah Benar',
                    type: 'postback', payload: {
                        method: "get",
                        url: "https://insignia.co.id",
                        payload: { type: 'button' }
                    }
                }
            ]
        })
    }
}
