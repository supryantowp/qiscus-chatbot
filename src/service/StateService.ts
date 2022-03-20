import { Service } from "typedi";

import { UserState } from "../types";

@Service()
export class StateService {
    // TODO: use cache with ttl library like node-cache
    private _state: Map<string, UserState> = new Map();

    public persist(user: string, data: UserState) {
        this._state.set(user, data);
    }

    public get(user: string) {
        return this._state.get(user)
    }
}
