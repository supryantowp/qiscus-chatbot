import Container, { Service } from "typedi";
import { Scene } from "../core/Scene";
import * as scenes from "../scene";

@Service()
export class SceneService {
    private _scenes: { [key: string]: Scene } = {};
    private _defaultScene = "MainScene";

    constructor() {
        this._loadAllScene();
    }

    public loadDefault() {
        return this._scenes[this._defaultScene];
    }

    public loadScene(name: string) {
        return this._scenes[name];
    }

    private _loadAllScene() {
        for (const key in scenes) {
            this._scenes[key] = new scenes[key]();
        }
    }
}
