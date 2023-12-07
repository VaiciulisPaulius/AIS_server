import mysql from 'mysql2';
import { Database } from "./database";

class MySqlDatabase implements Database {
    pool: any;

    constructor(host: string, user: string, password: string, database: string) {

        const config: mysql.PoolOptions = {
            host: host,
            user: user,
            password: password,
            database: database
        }

        try {
            this.pool = mysql.createPool(config)
        }
        catch(err) {
            console.log(err);
            return;
        }
        this.pool = this.pool.promise();
    }

    async query(query: string) : Promise<object> {
        try {
            const result: object = await this.pool.query(query);
            return result;
        }
        catch(err) {
            console.error(err);
        }
    }
}

let mysqlDb = new MySqlDatabase("localhost", "root", "", "ais");
export { mysqlDb };