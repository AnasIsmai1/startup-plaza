import z from "zod";

export const formSchema = z.object({
    title: z.string()
        .min(3, { message: "Name must be at least 3 characters long" })
        .max(50, { message: "Name must be at most 50 characters long" }),
    description: z.string()
        .min(10, { message: "Description must be at least 10 characters long" }),
    category: z.string()
        .min(3, { message: "Category must be at least 3 characters long" })
        .max(50, { message: "Category must be at most 50 characters long" }),
    link: z.string()
        .url({ message: "Invalid URL" })
        .refine(async (val) => {
            try {
                const res = await fetch(val, { method: "HEAD" });
                const contentType = res.headers.get("content-type");
                return contentType && contentType?.startsWith("image/");
            } catch (err) {
                return false;
            }

        }),
    pitch: z.string()
        .min(10, { message: "Pitch must be at least 10 characters long" })
        .max(500, { message: "Pitch must be at most 500 characters long" }),
})
