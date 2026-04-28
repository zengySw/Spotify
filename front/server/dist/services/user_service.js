import { query, queryWithClient } from "../db/queries.js";
const SELECT_USER_FIELDS = `
  id,
  email,
  password_hash,
  display_name,
  avatar_url,
  provider,
  provider_id,
  created_at,
  updated_at
`;
function execute(client, text, params) {
    if (client) {
        return queryWithClient(client, text, params);
    }
    return query(text, params);
}
export function toAuthUserDTO(user) {
    return {
        id: user.id,
        email: user.email,
        display_name: user.display_name,
        avatar_url: user.avatar_url,
        provider: user.provider,
    };
}
export async function findUserByEmail(email, client) {
    const result = await execute(client, `SELECT ${SELECT_USER_FIELDS} FROM users WHERE LOWER(email) = LOWER($1) LIMIT 1`, [email]);
    return result.rows[0] ?? null;
}
export async function findUserById(id, client) {
    const result = await execute(client, `SELECT ${SELECT_USER_FIELDS} FROM users WHERE id = $1 LIMIT 1`, [id]);
    return result.rows[0] ?? null;
}
export async function findUserByProviderIdentity(provider, providerId, client) {
    const result = await execute(client, `SELECT ${SELECT_USER_FIELDS} FROM users WHERE provider = $1 AND provider_id = $2 LIMIT 1`, [provider, providerId]);
    return result.rows[0] ?? null;
}
export async function createLocalUser(args, client) {
    const result = await execute(client, `
      INSERT INTO users (email, password_hash, display_name, provider)
      VALUES ($1, $2, $3, 'local')
      RETURNING ${SELECT_USER_FIELDS}
    `, [args.email, args.passwordHash, args.displayName]);
    return result.rows[0];
}
export async function createOAuthUser(args, client) {
    const result = await execute(client, `
      INSERT INTO users (email, password_hash, display_name, avatar_url, provider, provider_id)
      VALUES ($1, NULL, $2, $3, $4, $5)
      RETURNING ${SELECT_USER_FIELDS}
    `, [args.email, args.displayName, args.avatarUrl, args.provider, args.providerId]);
    return result.rows[0];
}
export async function updateUserProfile(args, client) {
    const result = await execute(client, `
      UPDATE users
      SET
        display_name = COALESCE($2, display_name),
        avatar_url = COALESCE($3, avatar_url)
      WHERE id = $1
      RETURNING ${SELECT_USER_FIELDS}
    `, [args.userId, args.displayName, args.avatarUrl]);
    return result.rows[0];
}
