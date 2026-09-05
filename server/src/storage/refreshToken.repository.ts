import { db } from "../config/database.config.js";

export async function createRefreshToken(
    id: string,
    userId: string,
    tokenHash: string,
    expiresAt: Date
){
    const result = await db.query(
        `
        INSERT INTO refresh_tokens(id, user_id, token_hash, expires_at)
        VALUES ($1, $2, $3, $4)
        RETURNING id, 
        user_id as "userId",
        token_hash as "tokenHash",
        expires_at as "expiresAt",
        revoked_at as "revokedAt",
        created_at as "createdAt"
        `,
        [
            id, userId, tokenHash, expiresAt
        ]
    )

    return result.rows[0];
}

export async function getRefreshTokenByTokenHash(tokenHash: string){
    const result = await db.query(`
        SELECT
            id,
            user_id AS "userId",
            token_hash AS "tokenHash",
            expires_at AS "expiresAt",
            revoked_at AS "revokedAt",
            created_at AS "createdAt"
        FROM refresh_tokens
        WHERE token_hash = $1
        `,
    [tokenHash])

    if (result.rows.length===0){
        return null
    }

    return result.rows[0]
}

// export async function getRefreshTokensByUserId(userId: string) {

//     const result = await db.query(
//         `
//         SELECT
//             id,
//             user_id AS "userId",
//             token_hash AS "tokenHash",
//             expires_at AS "expiresAt",
//             created_at AS "createdAt"
//         FROM refresh_tokens
//         WHERE user_id = $1
//         `,
//         [userId]
//     );

//     return result.rows;
// }