import type { PoolClient, QueryResult, QueryResultRow } from "pg";
import { pool } from "./pool.js";

export async function query<T extends QueryResultRow>(
  text: string,
  params: readonly unknown[] = []
): Promise<QueryResult<T>> {
  return pool.query<T>(text, params as unknown[]);
}

export async function queryWithClient<T extends QueryResultRow>(
  client: PoolClient,
  text: string,
  params: readonly unknown[] = []
): Promise<QueryResult<T>> {
  return client.query<T>(text, params as unknown[]);
}

export async function withTransaction<T>(fn: (client: PoolClient) => Promise<T>): Promise<T> {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    const result = await fn(client);
    await client.query("COMMIT");
    return result;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}
