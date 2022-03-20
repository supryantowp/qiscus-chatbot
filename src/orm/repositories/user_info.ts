import { getRepository } from 'typeorm'
import { UserInfo } from '../models/user_info'

export interface IUserInfoPayload {
    full_name?: string;
    email_address?: string;
    phone_number?: string;
    demo_product_type?: string;
    total_employees?: number;
    metrics?: string
}

export const getUserInfo = async (): Promise<Array<UserInfo>> => {
    const userInfoRepository = getRepository(UserInfo)
    return userInfoRepository.find()
}

export const createUserInfo = async (payload: IUserInfoPayload): Promise<UserInfo> => {
    const userInfoRepository = getRepository(UserInfo)
    const userInfo = new UserInfo()
    return userInfoRepository.save({
        ...userInfo,
        ...payload
    })
}