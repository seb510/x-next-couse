import type { Route } from "next";
import {PAGES} from "@/config/pages.config";

export interface IMenuItem {
    href: Route;
    name: string;
}

export const MENU: IMenuItem[] = [
    {
        href: PAGES.HOME,
        name: 'Home',
    },
    {
        href: PAGES.EXPLORE,
        name: 'Explore',
    },
    {
        href: PAGES.ABOUT,
        name: 'About',
    }
]
