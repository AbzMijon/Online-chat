export const isLoggedIn = (state: { user: { isLoggedIn: boolean; }; }) => state.user.isLoggedIn;
export const loggedUserName = (state: { user: { name: string; }; }) => state.user.name;
export const loggedUserPassword = (state: { user: { password: string; }; }) => state.user.password;
export const userColor = (state: { user: { color: string; }; }) => state.user.color;
export const userEmail = (state: { user: {email: string; } }) => state.user.email;