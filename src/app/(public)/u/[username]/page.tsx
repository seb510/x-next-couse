import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Profile } from "@/app/(public)/u/[username]/Profile";
import { PROFILES } from "@/shared/data/profiles.data";
import { TWEETS } from "@/shared/data/tweets.data";

interface Props {
    params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { username } = await params;
    const profile = PROFILES[username];
    if (!profile) return { title: "Profile not found" };

    const title = `${profile.displayName} (@${username})`;
    const description = profile.bio || `See what @${username} has been posting on X.`;
    return {
        title,
        description,
        openGraph: { title, description },
        twitter: { card: "summary", title, description },
    };
}

export default async function UserProfile({ params }: Props) {
    const { username } = await params;
    const profile = PROFILES[username];
    if (!profile) notFound();

    const tweets = TWEETS.filter(t => t.author === username);
    return <Profile profile={profile} tweets={tweets} />;
}
