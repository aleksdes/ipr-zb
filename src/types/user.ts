export enum UserRoles {
    'ROLE_ADMIN'='admin',
    'ROLE_GUEST'='guest'
}

export type User = {
    id: string | number | null
    email: string
    username: string
    firstName: string
    lastName: string
    gender: string
    image: string
    phone?: string
    roles?: UserRoles[] | []
    [key: string]: any
}

export type Users<T> = Array<T & User>;
