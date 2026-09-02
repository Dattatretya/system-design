import { db } from "../config/database.config.js";

export async function createUser(id: string, email: string, passwordHash: string){
    const result = await db.query(
        `
        INSERT INTO users (
            id,
            email,
            password_hash
        )
        VALUES ($1, $2, $3)
        RETURNING
            id,
            email,
            created_at AS "createdAt"
        `,
        [
            id, email, passwordHash
        ]

    )

    return result.rows[0]
}

export async function getUserByEmail(email: string){
    const result = await db.query(
        `
        SELECT id, email, password_hash as "passwordHash",
        created_at as "createdAt"
        FROM users
        WHERE email=$1
        `,
        [email]
    )

    return result.rows[0] ?? null
}

export async function getUserById(id: string){
    const result = await db.query(`
        SELECT id, email, created_at AS "createdAt" 
        FROM users 
        WHERE id=$1
        `,
    [id]
);

return result.rows[0] ?? null
}