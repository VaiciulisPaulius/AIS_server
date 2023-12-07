import { Database } from "../database";

export abstract class Entity {
    tableName: String;

    async getAll(database: Database): Promise<object> {
        const result = await database.query(`SELECT * FROM ${this.tableName}`);
        console.log(result)
        return result;
    }
    async getById(database: Database, id: Number) {
        const result = await database.query(`SELECT * FROM ${this.tableName} WHERE id = ${id}`);
    }
}