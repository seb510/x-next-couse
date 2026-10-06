import type { Route } from "next";

export const PAGES = {
    HOME: "/",
    EXPLORE: "/explore",
    ABOUT: "/about",
    PROFILE: (username: string) => `/u/${encodeURIComponent(username)}` as Route,
} as const;
