'use client';

import { useParams } from "next/navigation";
import { TWEETS } from "@/shared/data/tweets.data";
import { PROFILES } from "@/shared/data/profiles.data";
import { Tweet } from "@/app/(public)/(home)/Tweet";

function formatCount(n: number): string {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
    return String(n);
}

export function Profile() {
    const { username } = useParams<{ username: string }>();
    const profile = PROFILES[username];
    const tweets = TWEETS.filter(t => t.author === username);

    return (
        <div className="w-full">
            {/* Cover banner */}
            <div className="h-32 -mx-4 bg-white/5 rounded-b-none" />

            {/* Avatar + Follow row */}
            <div className="flex items-end justify-between -mt-10 mb-3">
                <div className="w-20 h-20 rounded-full bg-white border-4 border-black flex items-center justify-center text-black font-bold text-2xl select-none uppercase shrink-0">
                    {username[0]}
                </div>
                <button className="border border-white/30 hover:bg-white/5 text-white font-bold px-5 py-1.5 rounded-full text-sm transition-colors">
                    Follow
                </button>
            </div>

            {/* Identity */}
            <div className="mb-3">
                <h1 className="text-xl font-bold text-white leading-tight">
                    {profile?.displayName ?? username}
                </h1>
                <p className="text-white/50 text-sm">@{username}</p>
            </div>

            {/* Bio */}
            {profile?.bio && (
                <p className="text-white text-sm leading-relaxed mb-3">{profile.bio}</p>
            )}

            {/* Meta info */}
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-white/50 text-sm mb-3">
                {profile?.location && (
                    <span className="flex items-center gap-1">
                        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current shrink-0">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
                        </svg>
                        {profile.location}
                    </span>
                )}
                {profile?.website && (
                    <span className="flex items-center gap-1">
                        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current shrink-0">
                            <path d="M10 6v2H5v11h11v-5h2v6a1 1 0 01-1 1H4a1 1 0 01-1-1V7a1 1 0 011-1h6zm11-3v8h-2V6.413l-7.793 7.794-1.414-1.414L17.585 5H13V3h8z" />
                        </svg>
                        <a
                            href={`https://${profile.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:underline"
                        >
                            {profile.website}
                        </a>
                    </span>
                )}
                {profile?.joinedDate && (
                    <span className="flex items-center gap-1">
                        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current shrink-0">
                            <path d="M8 1.5V3h8V1.5C16 .672 16.672 0 17.5 0S19 .672 19 1.5V3h2.5C22.881 3 24 4.119 24 5.5v17c0 1.381-1.119 2.5-2.5 2.5h-19C1.119 25 0 23.881 0 22.5v-17C0 4.119 1.119 3 2.5 3H5V1.5C5 .672 5.672 0 6.5 0S8 .672 8 1.5zm-5.5 3C2.224 4.5 2 4.724 2 5v2h20V5c0-.276-.224-.5-.5-.5h-19zM2 9v13.5c0 .276.224.5.5.5h19c.276 0 .5-.224.5-.5V9H2z" />
                        </svg>
                        Joined {profile.joinedDate}
                    </span>
                )}
            </div>

            {/* Stats */}
            <div className="flex gap-5 text-sm mb-4">
                <span>
                    <span className="font-bold text-white">{formatCount(profile?.following ?? 0)}</span>
                    {" "}<span className="text-white/50">Following</span>
                </span>
                <span>
                    <span className="font-bold text-white">{formatCount(profile?.followers ?? 0)}</span>
                    {" "}<span className="text-white/50">Followers</span>
                </span>
            </div>

            {/* Tabs */}
            <div className="flex -mx-4 border-b border-white/10 mb-4">
                {["Posts", "Replies", "Media", "Likes"].map((tab) => (
                    <div
                        key={tab}
                        className={`flex-1 text-center py-3 text-sm font-medium transition-colors cursor-pointer ${
                            tab === "Posts"
                                ? "text-white border-b-2 border-white"
                                : "text-white/40 hover:text-white hover:bg-white/5"
                        }`}
                    >
                        {tab}
                    </div>
                ))}
            </div>

            {/* Tweet feed */}
            {tweets.length === 0 ? (
                <div className="py-16 text-center">
                    <p className="text-white font-bold text-xl mb-1">No posts yet</p>
                    <p className="text-white/50 text-sm">When @{username} posts, they'll show up here.</p>
                </div>
            ) : (
                <div className="flex flex-col gap-0">
                    {tweets.map(tweet => (
                        <Tweet key={tweet.id} tweet={tweet} />
                    ))}
                </div>
            )}
        </div>
    );
}
