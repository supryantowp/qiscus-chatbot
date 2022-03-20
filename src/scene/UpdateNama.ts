import { Scene } from "../core/Scene";
import { WebhookEvent } from "../types";

export class UpdateNamaScene extends Scene {
    public async onText(event: WebhookEvent): Promise<void> {
        const { from, room, message } = event
        const options = JSON.parse(room.options)
        if (options.source !== 'qiscus') return

        const userInfo = this.stateUserInfo.get('user_info')
        this.stateUserInfo.persist('user_info', { ...userInfo, full_name: message.text })
        return this.loadScene('RequestDemoScene').onEnter(event)
    }
}