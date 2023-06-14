export enum UserRoles {
    'ROLE_ADMIN'='admin',
    'ROLE_GUEST'='guest'
}

export type User = {
    id: string | number | null
    roles?: UserRoles[] | []
    permissions?: string[] | []
    name?: string
    surname?: string
    email?: string
    phone?: string
    avatar?: string
    [key: string]: any
}

export type Users<T> = Array<T & User>;
