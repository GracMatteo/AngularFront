export interface User {
    username: string;
    password: string;
    role: string;
}

export const users: User[] = [
    { username: 'user', password: 'user', role: 'user' },
    { username: 'admin', password: 'admin', role: 'admin' }
];

