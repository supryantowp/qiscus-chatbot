import { Scene } from "../core/Scene";
import { WebhookEvent } from "../types";

export class MarkethacScene extends Scene {

    public async onEnter(event: WebhookEvent): Promise<void> {
        const { from, room, } = event
        const userInfo = this.stateUserInfo.get('user_info')
        this.updateUserScene(from.email, 'MarkethacScene')
        const options = JSON.parse(room.options)
        if (options.source == 'qiscus') {
            if (!userInfo?.industry) {
                await this.widget.sendText(room.id_str, 'Boleh diinfokan kategori bisnis kamu?')
            }
            return this.updateUserScene(from.email, 'MarkethacBisnisTypeScene')
        }
    }
}