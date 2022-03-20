import Container from "typedi";
import { NluService } from "../service/NluService";
import { OrmService } from "../service/OrmService";
import { SceneService } from "../service/SceneService";
import { StateService } from "../service/StateService";
import { StateUserInfo } from "../service/StateUserInfo";
import { WidgetService } from "../service/WidgetService";
import { ButtonReplyMessage, EventMessage, From, ImageMessage, ListReplyMessage, TextMessage, WebhookEvent } from '../types'

export abstract class Scene {
    protected widget: WidgetService
    protected stateUserInfo: StateUserInfo
    protected nlu: NluService
    protected orm: OrmService

    constructor() {
        this.widget = Container.get(WidgetService)
        this.stateUserInfo = Container.get(StateUserInfo)
        this.nlu = Container.get(NluService)
        this.orm = Container.get(OrmService)
    }

    public async onText(event: WebhookEvent) { }
    public async onListReply(event: ListReplyMessage) { }
    public async onButtonReply(event: WebhookEvent) { }
    public async onImage(event: ImageMessage) { }
    public async onKarosel(event: WebhookEvent) { }

    public async onEnter(event: WebhookEvent) { }

    protected loadScene(name: string): Scene {
        const sceneService = Container.get(SceneService)

        return sceneService.loadScene(name)
    }

    protected updateUserScene(user: string, scene: string) {
        const stateService = Container.get(StateService)

        stateService.persist(user, {
            scene
        })
    }
}