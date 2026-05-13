import { pool } from "./pool.js";
export async function query(text, params = []) {
    return pool.query(text, params);
}
export async function queryWithClient(client, text, params = []) {
    return client.query(text, params);
}
export async function withTransaction(fn) {
    const client = await pool.connect();
    try {
        await client.query("BEGIN");
        const result = await fn(client);
        await client.query("COMMIT");
        return result;
    }
    catch (error) {
        await client.query("ROLLBACK");
        throw error;
    }
    finally {
        client.release();
    }
}
