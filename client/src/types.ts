export interface IUser {
    email: string,
    password: string,
    name: string,
    id: number | string,
    level: number | string,
    messageAmount?: number | string,
    about: string,
    registryDate: any,
}