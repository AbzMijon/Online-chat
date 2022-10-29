import { IUser } from "../types";
import fakeServerInstance from "./instanse";

export const fetchUsers = () => fakeServerInstance.get<IUser[]>('/users');
export const fetchUserMessageAmount = (id:number | string, countMessages: number) => fakeServerInstance.patch<IUser[]>(`/users/${id}`, {
    messageAmount: countMessages,
})
export const fetchUserChangeName = (id: number | string, newName: string) => {
    fakeServerInstance.patch<IUser[]>(`/users/${id}`, {
        name: newName,
    })
}
export const fetchUserChangePass = (id: number | string, newPass: string) => {
    fakeServerInstance.patch<IUser[]>(`/users/${id}`, {
        password: newPass,
    })
}
export const fetchUserChangeAbout = (id: number | string, newAbout: string) => {
    fakeServerInstance.patch<IUser[]>(`/users/${id}`, {
        about: newAbout,
    })
}
export const fetchUserDelete = (id: number | string) => fakeServerInstance.delete<IUser[]>(`/users/${id}`);