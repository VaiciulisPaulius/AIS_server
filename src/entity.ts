import { Database } from "./database";

export class Entity {
    tableName: String;

    constructor(tableName: string) {
        this.tableName = tableName;
    }

    async getAll(database: Database): Promise<object> {
        const result = await database.query(`SELECT * FROM ${this.tableName}`);
        console.log(result)
        return result;
    }
    async getById(database: Database, id: Number) {
        const result = await database.query(`SELECT * FROM ${this.tableName} WHERE id = ${id}`);
    }
}