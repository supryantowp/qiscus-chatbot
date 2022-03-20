import { Service } from "typedi";
import { SceneService } from "../service/SceneService";
import { StateService } from "../service/StateService";
import {
    ButtonReplyMessage,
    EventMessage,
    ImageMessage,
    ListReplyMessage,
    TextMessage,
    WebhookEvent,
} from "../types";
import { Scene } from "./Scene";

@Service()
export class EventHandler {
    constructor(
        private readonly scene: SceneService,
        private readonly state: StateService
    ) { }

    public async handleEvent(event: WebhookEvent) {
        await this._handleMessage(event)
    }

    private async _handleMessage(event: WebhookEvent) {
        const sceneKey = this.state.get(event.from.email)?.scene;

        let scene: Scene;
        if (!sceneKey) {
            scene = this.scene.loadDefault()
        } else {
            scene = this.scene.loadScene(sceneKey);
        }

        if (event.message.type == 'text') {
            scene.onText(event)
        }

        // @ts-ignore
        if (event.message.payload?.payload?.type == 'button') {
            scene.onButtonReply(event)
        }

        // @ts-ignore
        if (event.message.payload?.payload?.type == 'carousel') {
            scene.onKarosel(event)
        }

        console.log({ scene, sceneKey })
    }
}
