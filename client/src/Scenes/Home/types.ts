export type initialNameValuesTypes = {
    newName: string,
}
export type initialPasswordValuesTypes = {
    newPassword: string,
}
export type initialAboutValuesTypes = {
    about: string,
}
export type formValuesTypes = {
    newName: string,
    newPassword: string,
    about: string,
}
export type errorsObjTypes = {
    newName?: string,
    newPassword?: string,
    about?: string,
}
export type userTypes = {
    email: string,
    password: string,
    name: string,
    id: number | string,
    level: number | string,
    messageAmount: number | string,
    about: string,
}