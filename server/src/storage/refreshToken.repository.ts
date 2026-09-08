import { db } from "../config/database.config.js";
import { Pool, PoolClient } from "pg";

type DbClient = Pool | PoolClient

export async function createRefreshToken(
    id: string,
    userId: string,
    tokenHash: string,
    expiresAt: Date,
    client: DbClient = db
){
    const result = await client.query(
        `
        INSERT INTO refresh_tokens(
            id,
            user_id,
            token_hash,
            expires_at
        )
        VALUES ($1, $2, $3, $4)
        RETURNING
            id,
            user_id AS "userId",
            token_hash AS "tokenHash",
            expires_at AS "expiresAt",
            revoked_at AS "revokedAt",
            created_at AS "createdAt"
        `,
        [
            id,
            userId,
            tokenHash,
            expiresAt
        ]
    );

    return result.rows[0];
}

export async function getRefreshTokenByTokenHash(
    tokenHash: string,
    client: DbClient = db
){
    const result = await client.query(
        `
        SELECT
            id,
            user_id AS "userId",
            token_hash AS "tokenHash",
            expires_at AS "expiresAt",
            revoked_at AS "revokedAt",
            created_at AS "createdAt"
        FROM refresh_tokens
        WHERE token_hash = $1
        FOR UPDATE
        `,
        [tokenHash]
    );

    if (result.rows.length === 0){
        return null;
    }

    return result.rows[0];
}

export async function revokeRefreshToken(
    id: string,
    client: DbClient = db
){
    await client.query(
        `
        UPDATE refresh_tokens
        SET revoked_at = NOW()
        WHERE id = $1
        `,
        [id]
    );
}

export async function revokeRefreshTokenByHash(tokenHash: string, client: DbClient = db){
    await client.query(`
        UPDATE refresh_tokens
        SET revoked_at = NOW()
        WHERE token_hash=$1
        `, [tokenHash]);
}