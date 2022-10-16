import fakeServerInstance from "./instanse";

export const fetchUsers = () => fakeServerInstance.get('/users');
export const fetchUserId = (id:number | string, countMessages: number) => fakeServerInstance.patch(`/users/${id}`, {
    messageAmount: countMessages,
})