"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import { postTweet } from "@/server-actions/post-tweet";

const MAX_CHARS = 280;
const RING_RADIUS = 9;
const CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

export function TweetForm() {
    const [text, setText] = useState("");
    const [isPending, startTransition] = useTransition();
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const el = textareaRef.current;
        if (!el) return;
        el.style.height = "auto";
        el.style.height = `${el.scrollHeight}px`;
    }, [text]);

    function handleAction(formData: FormData) {
        if (!text.trim() || text.length > MAX_CHARS) return;
        startTransition(async () => {
            await postTweet(formData);
            setText("");
        });
    }

    const remaining = MAX_CHARS - text.length;
    const isOverLimit = remaining < 0;
    const isNearLimit = remaining <= 20 && !isOverLimit;
    const ringColor = isOverLimit ? "#f4212e" : isNearLimit ? "#888888" : "#ffffff";
    const progress = Math.min(text.length / MAX_CHARS, 1);
    const strokeDashoffset = CIRCUMFERENCE * (1 - progress);

    return (
        <form
            action={handleAction}
            className="flex gap-3 px-4 pt-3 pb-3 mb-7 border border-white/10 rounded-xl"
        >
            {/* Avatar */}
            <div className="shrink-0 pt-0.5">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black font-bold select-none">
                    U
                </div>
            </div>

            {/* Compose area */}
            <div className="flex-1 flex flex-col min-w-0">
                <textarea
                    ref={textareaRef}
                    name="content"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="What is happening?!"
                    rows={1}
                    className="w-full bg-transparent text-white placeholder-white/40 resize-none outline-none text-xl leading-7 min-h-[52px] py-2"
                />

                <div className="border-t border-white/10 mt-1 mb-2" />

                {/* Toolbar */}
                <div className="flex items-center justify-between">
                    {/* Action icons */}
                    <div className="flex items-center -ml-2">
                        <ToolbarButton label="Media">
                            <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z" />
                        </ToolbarButton>
                        <ToolbarButton label="GIF">
                            <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v13c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-13c0-.276-.224-.5-.5-.5h-13zM8 9.5C8 9.224 8.224 9 8.5 9h1c.276 0 .5.224.5.5v5c0 .276-.224.5-.5.5h-1C8.224 15 8 14.776 8 14.5v-5zm3.5.5c0-.276.224-.5.5-.5h2c.276 0 .5.224.5.5v1c0 .276-.224.5-.5.5h-1.5V13h1.5c.276 0 .5.224.5.5v1c0 .276-.224.5-.5.5h-1.5v1c0 .276-.224.5-.5.5h-1c-.276 0-.5-.224-.5-.5V10z" />
                        </ToolbarButton>
                        <ToolbarButton label="Poll">
                            <path d="M6 5c-1.1 0-2 .895-2 2v10c0 1.105.9 2 2 2h2c1.1 0 2-.895 2-2V7c0-1.105-.9-2-2-2H6zm10 4c-1.1 0-2 .895-2 2v6c0 1.105.9 2 2 2h2c1.1 0 2-.895 2-2v-6c0-1.105-.9-2-2-2h-2z" />
                        </ToolbarButton>
                        <ToolbarButton label="Emoji">
                            <path d="M8 9.5C8 8.119 8.672 7 9.5 7S11 8.119 11 9.5 10.328 12 9.5 12 8 10.881 8 9.5zm6.5 0c0-1.381.672-2.5 1.5-2.5s1.5 1.119 1.5 2.5-.672 2.5-1.5 2.5-1.5-1.119-1.5-2.5zM12 18c3.038 0 5.5-2 5.5-5H6.5c0 3 2.462 5 5.5 5zM12 2.5c-5.247 0-9.5 4.253-9.5 9.5S6.753 21.5 12 21.5s9.5-4.253 9.5-9.5S17.247 2.5 12 2.5zM1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12z" />
                        </ToolbarButton>
                        <ToolbarButton label="Schedule">
                            <path d="M8 1.5V3h8V1.5C16 .672 16.672 0 17.5 0S19 .672 19 1.5V3h2.5C22.881 3 24 4.119 24 5.5v17c0 1.381-1.119 2.5-2.5 2.5h-19C1.119 25 0 23.881 0 22.5v-17C0 4.119 1.119 3 2.5 3H5V1.5C5 .672 5.672 0 6.5 0S8 .672 8 1.5zm-5.5 3C2.224 4.5 2 4.724 2 5v2h20V5c0-.276-.224-.5-.5-.5h-19zM2 9v13.5c0 .276.224.5.5.5h19c.276 0 .5-.224.5-.5V9H2zm11 3h3v3h-3v-3z" />
                        </ToolbarButton>
                    </div>

                    {/* Right: counter + divider + post */}
                    <div className="flex items-center gap-3">
                        {text.length > 0 && (
                            <>
                                <div className="relative w-5 h-5">
                                    <svg viewBox="0 0 24 24" className="w-5 h-5 -rotate-90">
                                        <circle
                                            cx="12" cy="12" r={RING_RADIUS}
                                            fill="none"
                                            stroke="white"
                                            strokeOpacity="0.2"
                                            strokeWidth="2.5"
                                        />
                                        <circle
                                            cx="12" cy="12" r={RING_RADIUS}
                                            fill="none"
                                            stroke={ringColor}
                                            strokeWidth="2.5"
                                            strokeDasharray={CIRCUMFERENCE}
                                            strokeDashoffset={strokeDashoffset}
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    {(isNearLimit || isOverLimit) && (
                                        <span
                                            className={`absolute inset-0 flex items-center justify-center text-[10px] font-semibold ${isOverLimit ? "text-red-500" : "text-white/60"}`}
                                        >
                                            {remaining}
                                        </span>
                                    )}
                                </div>
                                <div className="w-px h-5 bg-white/10" />
                            </>
                        )}
                        <button
                            type="submit"
                            disabled={!text.trim() || isOverLimit || isPending}
                            className="bg-white hover:bg-white/90 disabled:opacity-40 disabled:cursor-not-allowed text-black font-bold px-4 py-1.5 rounded-full text-sm transition-colors"
                        >
                            {isPending ? "Posting…" : "Post"}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}

function ToolbarButton({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <button
            type="button"
            aria-label={label}
            className="p-2 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors"
        >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                {children}
            </svg>
        </button>
    );
}
