"use server";

import { auth } from "@/auth";
import { parseServerAction } from "./utils";
import { writeclient } from "@/sanity/lib/write-client";
import slugify from "slugify";

export const createPitch = async (state: any, formData: FormData, pitch: string) => {
    const session = await auth();

    if (!session) return parseServerAction({ error: "Not signed in", status: "ERROR" });

    const { title, description, category, link } = Object.fromEntries(Array.from(formData).filter(([key]) => key !== "pitch"));

    const slug = slugify(title as string, { lower: true, strict: true });

    try {
        const result = await writeclient.create({
            _type: "startup",
            title,
            description,
            category,
            views: 0,
            image: link,
            slug: {
                _type: "slug",
                current: slug,
            },
            author: {
                _type: "reference",
                _ref: session?.id,
            },
            pitch
        })

        return parseServerAction({ ...result, error: "", status: "SUCCESS" });
    } catch (err) {
        console.error(err);
        return parseServerAction({ error: JSON.stringify(err), status: "ERROR" });

    }

}
