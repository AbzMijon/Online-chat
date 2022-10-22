import fakeServerInstance from "./instanse";

export const fetchUsers = () => fakeServerInstance.get('/users');
export const fetchUserMessageAmount = (id:number | string, countMessages: number) => fakeServerInstance.patch(`/users/${id}`, {
    messageAmount: countMessages,
})
export const fetchUserChangeName = (id: number | string, newName: string) => {
    fakeServerInstance.patch(`/users/${id}`, {
        name: newName,
    })
}
export const fetchUserChangePass = (id: number | string, newPass: string) => {
    fakeServerInstance.patch(`/users/${id}`, {
        password: newPass,
    })
}
export const fetchUserChangeAbout = (id: number | string, newAbout: string) => {
    fakeServerInstance.patch(`/users/${id}`, {
        about: newAbout,
    })
}
export const fetchUserDelete = (id: number | string) => fakeServerInstance.delete(`/users/${id}`);