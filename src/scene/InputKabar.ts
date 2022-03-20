import { Scene } from "../core/Scene";
import { WebhookEvent } from "../types";

export class InputKabarScene extends Scene {
    public async onText(event: WebhookEvent): Promise<void> {
        this._handleInputKabarScene(event)
    }

    private async _handleInputKabarScene(event: WebhookEvent) {
        const { from, message, room } = event
        const options = JSON.parse(room.options)
        if (options.source == 'qiscus') {
            await this.widget.sendText(room.id_str, 'Boleh tahu nggak zodiak kamu apa?')
            return this.updateUserScene(from.email, 'InputZodiakScene')
        }
    }

}