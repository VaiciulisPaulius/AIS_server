import { Entity } from "./entity";
import { Database } from "database";

export type personType = {
    id: number,
    role_id: number,
    group_id: number,
    first_name: string,
    last_name: string,
    email: string,
    username: string,
    password: string
}

export class Person extends Entity {
    async authenticate(username: string, password: string, database: Database) {
        const sql = `SELECT * FROM person WHERE username = '${username}' AND password = '${password}'`;

        console.log(sql)
        const result: any = await database.query(sql);

        return result[0][0];
    }
}
const person: Person = new Person();
export { person }