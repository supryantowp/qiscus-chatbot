import Container from "typedi";
import { Scene } from "../core/Scene";
import { SceneService } from "../service/SceneService";
import { WebhookEvent } from "../types";

const validateEmail = (email: string) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export class InputEmailScene extends Scene {
    public async onText(event: WebhookEvent): Promise<void> {
        this.sendEmail(event)
    }

    public async sendEmail(payload: WebhookEvent) {
        const { room, from, message } = payload
        const options = JSON.parse(room.options)
        if (options.source == 'qiscus') {
            if (!validateEmail(message.text)) {
                await this.widget.sendText(room.id_str, 'format email yang kamu masukan salah!')
                return
            }
            const userInfo = this.stateUserInfo.get('user_info')
            this.stateUserInfo.persist('user_info', { ...userInfo, email_address: message.text })
            Container.get(SceneService).loadScene('OnBoardingScene').onText(payload)
        }
    }
}
