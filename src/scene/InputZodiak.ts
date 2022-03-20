import { Scene } from "../core/Scene";
import { WebhookEvent } from "../types";

export class InputZodiakScene extends Scene {
    public async onText(event: WebhookEvent): Promise<void> {
        this._handleInputZodiak(event)
    }

    private async _handleInputZodiak(event: WebhookEvent) {
        const { from, room, message } = event
        const options = JSON.parse(room.options)
        if (options.source == 'qiscus') {
            const userInfo = this.stateUserInfo.get('user_info')
            this.stateUserInfo.persist('user_info', { ...userInfo, zodiak: message.text })
            const msg = this._handleZodiak(message.text)

            await this.widget.sendText(room.id_str, 'Aku harus manggil kamu dengan siapa nih? Ketikin Nama kamu dong! ')
            return this.updateUserScene(from.email, 'InputNamaScene')
        }
    }

    private async _handleZodiak(message: string) {
        const { data } = await this.nlu.getZodiak(message)
        const response = data.data
        console.log(data.data.process)
    }
}