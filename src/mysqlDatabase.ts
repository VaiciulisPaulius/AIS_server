import mysql from 'mysql2';
import { Database } from "./database";

export class MySqlDatabase implements Database {
    pool: any;

    constructor(host: string, user: string, password: string, database: string) {

        const config: mysql.PoolOptions = {
            host: host,
            user: user,
            password: password,
            database: database
        }

        this.pool = mysql.createPool(config).promise();
    }

    async query(query: string) : Promise<object> {
        const result: object = await this.pool.query(query);
        return result
    }
}