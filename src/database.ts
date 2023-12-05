export interface Database {
    pool: any;

    query(query: string) : Promise<object>;
}