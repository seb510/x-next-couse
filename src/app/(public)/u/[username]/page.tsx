import type { Metadata } from "next";

export const metadata: Metadata = {
    title: 'User Profile',
    description: 'View and manage your user profile',
}

export default function UserProfile() {
    return (
        <div className="min-h-screen flex justify-center items-center px-4 py-8">
            <h1 className="text-3xl font-bold">User Profile</h1>
        </div>
    );
}