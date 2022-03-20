import { Scene } from "../core/Scene";
import { IUserInfoPayload } from "../service/OrmService";
import { WebhookEvent } from "../types";

export class CreateDemoScene extends Scene {
    public async onEnter(event: WebhookEvent): Promise<void> {
        const { from, message, room } = event
        const options = JSON.parse(room.options)
        if (options.source !== 'qiscus') return

        await this.widget.sendText(room.id_str, 'Baik, Terima kasih sudah menunggu')
        const userInfo = this.stateUserInfo.get('user_info')

        try {
            //@ts-ignore
            await this.orm.createUserInfo(userInfo)
            await this.widget.sendText(room.id_str, 'Baik, Terima kasih! kami akan segera hubungi anda perihal request demo tersebut untuk informasi lebih lanjut anda juga dapat menghubungi kami di : sales@insignia.co.id +622153677055 ')
            return this.updateUserScene(from.email, 'OnBoardingScene')
        } catch (error) {
            console.log(error)
            await this.widget.sendText(room.id_str, 'Maaf ada kesalahan sistem')
        }
    }
}