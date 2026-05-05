export const PAGES = {
    HOME: "/",
    EXPLORE: "/explore",
    ABOUT: "/about",
    PROFILE: (username:string) => `/u/${username}`,
}