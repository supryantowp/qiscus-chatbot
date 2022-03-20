import { Service } from "typedi";
import { getRepository } from "typeorm";
import { UserInfo } from "../orm/models";

export interface IUserInfoPayload {
    full_name?: string;
    email_address?: string;
    phone_number?: string;
    demo_product_type?: string;
    total_employees?: number;
    industry?: string
}

@Service()
export class OrmService {
    public async createUserInfo(req: IUserInfoPayload) {
        const userInfoRepository = getRepository(UserInfo)
        const userInfo = new UserInfo()
        return userInfoRepository.save({
            ...userInfo,
            ...req
        })
    }
}