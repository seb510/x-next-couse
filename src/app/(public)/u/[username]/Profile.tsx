'use client';

import {useParams} from "next/navigation";

export function Profile() {
    const params = useParams<{username: string}>();

    return (
        <div className="min-h-screen flex justify-center px-4 py-8">
            <h1 className="text-3xl font-bold">User Profile: @{params.username}</h1>
        </div>
    );
}