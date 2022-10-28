export const ROUTES = {
    homePage: '/home',
    loginPage: '/login',
    chat: '/chat',
    users: '/users',
    achives: '/achives',
    support: '/support',
    supportSubmit: '/supportSubmit',
    userProfileId: '/userProfileId/:userId',
}

export const PATH = {
    homePage: '/home',
    loginPage: '/login',
    chat: '/chat',
    users: '/users',
    achives: '/achives',
    support: '/support',
    supportSubmit: '/supportSubmit',
    userProfileId: (userId: number | string) => `/userProfileId/${userId}`,
}