import type { Metadata, Route } from "next";
import Link from "next/link";
import { Tweet } from "@/app/(public)/(home)/Tweet";
import { TWEETS } from "@/shared/data/tweets.data";
import { PAGES } from "@/config/pages.config";

export const metadata: Metadata = {
    title: "Explore",
};

const TRENDING_TOPICS = [
    { tag: "NextJS", count: "12.4K posts" },
    { tag: "TypeScript", count: "9.1K posts" },
    { tag: "OpenSource", count: "7.8K posts" },
    { tag: "WebDev", count: "6.3K posts" },
    { tag: "ReactJS", count: "5.5K posts" },
];

interface Props {
    searchParams: Promise<{ tag?: string | string[] }>;
}

export default async function ExplorePage({ searchParams }: Props) {
    const { tag: rawTag } = await searchParams;
    const tag = (Array.isArray(rawTag) ? rawTag[0] : rawTag)?.trim() || null;

    const tweets = tag
        ? TWEETS.filter(t => t.text.toLowerCase().includes(tag.toLowerCase()))
        : TWEETS.slice(0, 5);

    return (
        <div className="text-white w-full">
            <h1 className="text-3xl font-bold mb-6">
                Explore{" "}
                {tag && (
                    <span className="text-white/50 font-normal">by <span className="text-white font-semibold">#{tag}</span></span>
                )}
            </h1>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-3">Trending topics</h2>
                <div className="flex flex-wrap gap-2">
                    {TRENDING_TOPICS.map(topic => {
                        const isActive = topic.tag.toLowerCase() === tag?.toLowerCase();
                        return (
                            <Link
                                key={topic.tag}
                                href={(isActive ? PAGES.EXPLORE : `${PAGES.EXPLORE}?tag=${topic.tag}`) as Route}
                                className={`border rounded-xl px-4 py-2 bg-black shadow-md transition-colors ${
                                    isActive ? "border-white" : "border-white/10 hover:border-white/40"
                                }`}
                            >
                                <p className="font-semibold">#{topic.tag}</p>
                                <p className="text-white/50 text-sm">{topic.count}</p>
                            </Link>
                        );
                    })}
                </div>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-3">{tag ? "Matching posts" : "Featured posts"}</h2>
                {tweets.length === 0 ? (
                    <div className="border border-white/10 rounded-xl py-10 text-center">
                        <p className="font-bold mb-1">No posts about #{tag} yet</p>
                        <Link href={PAGES.EXPLORE} className="text-white/50 text-sm hover:underline">
                            Clear filter
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {tweets.map(tweet => (
                            <Tweet key={tweet.id} tweet={tweet} />
                        ))}
                    </div>
                )}
            </section>

            <Link
                href={PAGES.HOME}
                className="inline-block mt-6 px-6 py-2 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-colors"
            >
                Go to Home
            </Link>
        </div>
    );
}
