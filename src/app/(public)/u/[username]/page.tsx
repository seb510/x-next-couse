import type { Metadata } from "next";
import {Profile} from "@/app/(public)/u/[username]/Profile";

export const metadata: Metadata = {
    title: 'User Profile',
    description: 'View and manage your user profile',
}

export default function UserProfile() {
    return (
        <Profile/>
    );
}