import { Service } from 'typedi'
import { UserInfoState } from '../types'

@Service()
export class StateUserInfo {
    private _state: Map<string, UserInfoState> = new Map()

    public persist(user: string, data: UserInfoState) {
        this._state.set(user, data);
    }

    public get(user: string) {
        return this._state.get(user)
    }
}