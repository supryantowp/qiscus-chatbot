import { Scene } from "../core/Scene";
import { WebhookEvent } from "../types";

export class MarkethacBisnisTypeScene extends Scene {

    public async onButtonReply(event: WebhookEvent): Promise<void> {
        const userInfo = this.stateUserInfo.get('user_info')
        this.stateUserInfo.persist('user_info', { ...userInfo, metrics: event.message.text })
        this.loadScene('MarkethacContentScene').onEnter(event)
    }

    public async onText(event: WebhookEvent): Promise<void> {
        const { from, message, room } = event
        const options = JSON.parse(room.options)
        if (options.source !== 'qiscus') return

        const userInfo = this.stateUserInfo.get('user_info')
        this.stateUserInfo.persist('user_info', { ...userInfo, industry: message.text })

        if (!userInfo?.metrics) {
            await this.widget.sendButton(room.id_str, '', {
                text: 'Metrics apa yang ingin kamu cari',
                buttons: [
                    {
                        label: 'Competitor Performance',
                        type: 'postback',
                        payload: {
                            method: "get",
                            url: "https://insignia.co.id",
                            payload: { type: 'button' }
                        }
                    },
                    {
                        label: 'Pricing Strategy',
                        type: 'postback',
                        payload: {
                            method: "get",
                            url: "https://insignia.co.id",
                            payload: { type: 'button' }
                        }
                    },
                    {
                        label: 'Informasi Campaign',
                        type: 'postback',
                        payload: {
                            method: "get",
                            url: "https://insignia.co.id",
                            payload: { type: 'button' }
                        }
                    },
                    {
                        label: 'All of the above',
                        type: 'postback',
                        payload: {
                            method: "get",
                            url: "https://insignia.co.id",
                            payload: { type: 'button' }
                        }
                    },
                ]
            })
        } else {
            return this.loadScene('MarkethacContentScene').onEnter(event)
        }

    }
}