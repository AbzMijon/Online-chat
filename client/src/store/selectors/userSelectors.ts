export const isLoggedIn = (state: { user: { isLoggedIn: boolean; }; }) => state.user.isLoggedIn;
export const loggedUserName = (state: { user: { name: string; }; }) => state.user.name;
export const userColor = (state: { user: { color: string; }; }) => state.user.color;
export const userEmail = (state: { user: {email: string; } }) => state.user.email;
export const loggedUserId = (state: { user: {id: number | string; } }) => state.user.id;