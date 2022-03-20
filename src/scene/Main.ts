import Container from "typedi";
import { Scene } from "../core/Scene";
import { SceneService } from "../service/SceneService";
import { MessageBase, WebhookEvent } from "../types";

export class MainScene extends Scene {
    public async onText(payload: WebhookEvent): Promise<void> {
        this._handleRegistration(payload)
    }

    private async _handleRegistration(payload: WebhookEvent) {
        const { room, from, message } = payload
        const options = JSON.parse(room.options)
        const greetings = this.checkTimestamp(payload.message)
        console.log('masuk main', message.text)
        if (options.source == 'qiscus') {
            await this.widget.sendText(room.id_str, greetings)
            await this.widget.sendText(room.id_str, 'Apa kabar? Kenalin dengan aku NIA !')
            return this.updateUserScene(from.email, 'InputKabarScene')
        }
    }

    private checkTimestamp(message: MessageBase) {
        const date = new Date(message.timestamp)
        const currentHour: number = date.getHours()
        let greetings = ''
        if (currentHour >= 4 && currentHour <= 10) {
            greetings = 'Selamat Pagi!'
        } else if (currentHour >= 10 && currentHour <= 18) {
            greetings = 'Selamat Siang!'
        } else {
            greetings = 'Selamat Malam!'
        }
        return greetings
    }
}
