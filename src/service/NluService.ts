import axios, { Axios, AxiosInstance } from "axios";
import { Service } from "typedi";
import fetch from "node-fetch";

@Service()
export class NluService {
    private _client: AxiosInstance

    constructor() {
        this._client = axios.create({
            baseURL: 'http://128.199.218.191:5000/graphql',
            headers: {
                'Content-Type': 'application/json',
            }
        })
    }

    public async getZodiak(zodiak: string) {
        const query = {
            "operationName": "fetchAuthor",
            "query": `query fetchAuthor { process (text: "${zodiak}") { domain classifications { intent score } } }`,
            "variables": {}
        }

        return await this._client.post('', query)
    }
}