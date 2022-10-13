import fakeServerInstance from "./instanse";

export const fetchUsers = () => fakeServerInstance.get('/users');