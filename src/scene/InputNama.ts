import { Scene } from "../core/Scene";
import { WebhookEvent } from "../types";

export class InputNamaScene extends Scene {
    public async onText(event: WebhookEvent): Promise<void> {
        this.sendNama(event)
    }

    public async sendNama(payload: WebhookEvent) {
        const { room, from, message } = payload
        const options = JSON.parse(room.options)
        if (options.source == 'qiscus') {
            const userInfo = this.stateUserInfo.get('user_info')
            this.stateUserInfo.persist('user_info', { ...userInfo, full_name: message.text })
            await this.widget.sendText(room.id_str, 'Sebelum memulai, Nia boleh tahu alamat email bisnis kamu dong! Agar kamu bisa kembali ke sesi ini lagi kalau kamu disconnected ')
            return this.updateUserScene(from.email, 'InputEmailScene')
        }
    }
}
