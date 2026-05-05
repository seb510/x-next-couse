import type { Metadata } from "next";
import { Profile } from "@/app/(public)/u/[username]/Profile";

interface Props {
    params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { username } = await params;
    return {
        title: `@${username} · X`,
        description: `See what @${username} has been posting on X.`,
        openGraph: {
            title: `@${username} · X`,
            description: `See what @${username} has been posting on X.`,
        },
        twitter: {
            card: "summary",
            title: `@${username} · X`,
            description: `See what @${username} has been posting on X.`,
        },
    };
}

export default function UserProfile() {
    return <Profile />;
}