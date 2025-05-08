import { UserIcon } from "lucide-react";
import { defineType, defineField } from "sanity";

export const Author = defineType({
    name: "author",
    title: "Author",
    type: "document",
    icon: UserIcon,
    fields: [
        defineField({
            name: "id",
            title: "ID",
            type: "number",
            validation: (Rule: any) => Rule.required(),
        }),
        defineField({
            name: "name",
            title: "Name",
            type: "string",
            validation: (Rule: any) => Rule.required(),
        }),
        defineField({
            name: "email",
            title: "Email",
            type: "string",
            validation: (Rule: any) => Rule.required(),
        }),
        defineField({
            name: "username",
            title: "Username",
            type: "string",
            validation: (Rule: any) => Rule.required(),
        }),
        defineField({
            name: "image",
            title: "Image",
            type: "url",
            validation: (Rule: any) => Rule.required(),
        }),
        defineField({
            name: "bio",
            title: "Bio",
            type: "text",
            validation: (Rule: any) => Rule.required(),
        })
    ],
    preview: {
        select: {
            title: "name",
        },
    }
})
