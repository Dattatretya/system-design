export interface User {
    id: string;
    email: string;
}

export interface LoginResponse {
    success: boolean;
    data: {
        user: User;
        accessToken: string;
    }
}

export interface registerResponse {
    success: boolean;
    data: {
        user: User;
    }
}