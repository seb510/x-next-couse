'use client';

import { Tweet } from "@/app/(public)/(home)/Tweet";
import { TWEETS } from "@/shared/data/tweets.data";
import {useRouter} from "next/navigation";
import {useSearchParams} from "next/navigation";
import {PAGES} from "@/config/pages.config";

const TRENDING_TOPICS = [
    { tag: "NextJS", count: "12.4K posts" },
    { tag: "TypeScript", count: "9.1K posts" },
    { tag: "OpenSource", count: "7.8K posts" },
    { tag: "WebDev", count: "6.3K posts" },
    { tag: "ReactJS", count: "5.5K posts" },
];

const featured = TWEETS.slice(0, 5);

export default function ExploreBlock() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const tag = searchParams.get("tag");
    return (
        <div className="text-white w-full">
            <h1 className="text-3xl font-bold mb-6">
                Explore{" "}
                {!!tag && (
                    <span className="text-white/50 font-normal">by <span className="text-white font-semibold">#{tag}</span></span>
                )}
            </h1>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-3">Trending topics</h2>
                <div className="flex flex-wrap gap-2">
                    {TRENDING_TOPICS.map(({ tag, count }) => (
                        <div key={tag} className="border border-white/10 rounded-xl px-4 py-2 bg-black shadow-md">
                            <p className="font-semibold">#{tag}</p>
                            <p className="text-white/50 text-sm">{count}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-3">Featured posts</h2>
                <div className="grid gap-4">
                    {featured.map(tweet => (
                        <Tweet key={tweet.id} tweet={tweet} />
                    ))}
                </div>
            </section>
            <button
                onClick={() => router.push(PAGES.HOME)}
                className="mt-6 px-6 py-2 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-colors"
            >
                Go to Home
            </button>
        </div>
    );
}
