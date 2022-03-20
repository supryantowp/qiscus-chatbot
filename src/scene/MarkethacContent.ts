import { Scene } from "../core/Scene";
import { WebhookEvent } from "../types";

export class MarkethacContentScene extends Scene {
    public async onButtonReply(event: WebhookEvent): Promise<void> {
        const { message, room } = event

        if (message.text == 'Solusi Insignia') {
            return this.loadScene('OnBoardingScene').onText(event)
        } else {
            await this.widget.sendText(room.id_str, 'Dengan senang hati ! kita akan bantu berikan demo kepada anda.')
            return this.loadScene('RequestDemoScene').onEnter(event)
        }

    }

    public async onEnter(event: WebhookEvent): Promise<void> {
        const { from, room } = event
        const options = JSON.parse(room.options)
        if (options.source !== 'qiscus') return

        this.updateUserScene(from.email, 'MarkethacContentScene')
        await this.widget.sendText(room.id_str, 'Content for How data can help your business ')
        await this.widget.sendButton(room.id_str, '', {
            text: 'Ada lagi kah yang bisa kami bantu?',
            buttons: [
                {
                    label: 'Solusi Insignia',
                    type: 'postback',
                    payload: {
                        method: "get",
                        url: "https://insignia.co.id",
                        payload: { type: 'button' }
                    }
                },
                {
                    label: 'Ajukan demo',
                    type: 'postback',
                    payload: {
                        method: "get",
                        url: "https://insignia.co.id",
                        payload: { type: 'button' }
                    }
                }
            ]
        })
    }
}