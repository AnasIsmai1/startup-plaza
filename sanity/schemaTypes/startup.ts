import { defineType } from "sanity";

export const Startup = defineType({
    name: "startup",
    title: "Startup",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
        },
        {
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "title",
            }
        },
        {
            name: "description",
            title: "Description",
            type: "text",
        },
        {
            name: "category",
            title: "Category",
            type: "string",
            validation: (Rule: any) => Rule.min(0).max(20).required().error("Category is required"),
        },
        {
            name: "views",
            title: "Views",
            type: "number",
        },
        {
            name: "author",
            type: "reference",
            to: { type: "author" },
        },
        {
            name: "image",
            title: "Image",
            type: "url"
        },
        {
            name: "pitch",
            title: "Pitch",
            type: "markdown",
        },
    ],
})
