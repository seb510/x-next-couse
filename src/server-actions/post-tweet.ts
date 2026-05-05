'use server';

import { revalidatePath } from "next/cache";
import { TWEETS } from "@/shared/data/tweets.data";
import { PAGES } from "@/config/pages.config";

export async function postTweet(formData: FormData) {
    const content = formData.get("content")?.toString().trim();
    if (!content || content.length > 280) return;

    TWEETS.unshift({
        id: Date.now(),
        text: content,
        author: "sebistian",
    });

    revalidatePath(PAGES.HOME);
}
