// path: /admin/login
export interface AWSLAdminLogin {
    email: string;
    password: string;
    token: string;
}

export interface tokenPayload{
    email: string;
    id: number;
    role: string;
}