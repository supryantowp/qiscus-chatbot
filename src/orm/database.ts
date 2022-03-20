import { ConnectionOptions } from "typeorm";
import { UserInfo } from "./models";

const config: ConnectionOptions = {
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [UserInfo],
    synchronize: true,
};

export default config;