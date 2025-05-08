import { Metadata } from "next"
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import markdownit from "markdown-it";
import { Suspense } from "react";

import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { STARTUPS_BY_ID_QUERY } from "@/sanity/lib/queries"
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";


export const experimental_ppr: Boolean = true;

export const metadata: Metadata = {
    title: "Startup | YC Directory",
    description: "This is the startup page",
}


async function page({ params }: { params: { id: string } }) {
    const id = (await params).id

    const md = markdownit()
    const query_params = {
        id: id || null
    }

    const post = await client.fetch(STARTUPS_BY_ID_QUERY, query_params);

    if (!post) notFound();


    const parsedContent = md.render(post?.pitch || "")

    return (
        <>
            <section className="pink_container !min-h-[230px]">
                <p className="tag">
                    {formatDate(post?._createdAt)}
                </p>
                <h1 className="heading">
                    {post.title}
                </h1>
                <p className="sub-heading !max-w-5xl">
                    {post.description}
                </p>
            </section>

            <section className="section_container">
                <img
                    src={post.image}
                    alt="thumbnail"
                    className="w-full h-auto rounded-xl" />

                <div className="space-y-5 mt-10 mx-auto max-w-4xl">
                    <div className="flex-between gap-5">
                        <Link href={`/user/${post?.author?._id}`} className="flex items-center mb-3 gap-2">
                            <Image src={post?.author?.image} alt={post?.author?.name + "'s avatar"} className="rounded-full drop-shadow-lg" width={64} height={64} />
                            <div>
                                <p className="text-20-medium"> {post.author?.name} </p>
                                <p className="text-16-medium !text-black-300"> @{post.author?.username} </p>
                            </div>
                        </Link>

                        <p className="category-tag">{post.category}</p>
                    </div>

                    <h3 className="text-30-bold">Pitch Details</h3>
                    {
                        parsedContent ? (
                            <article className="prose max-w-4xl font-work-sans break-all" dangerouslySetInnerHTML={{ __html: parsedContent }} />
                        ) : (
                            <p className="no-result">No Pitch Found</p>
                        )
                    }
                </div>

                <hr className="divider" />

                {/* TODO: Editor Selected Startups */}

                <Suspense fallback={<Skeleton className="view_skeleton" />}>
                    <View id={id} />
                </Suspense>

            </section>
        </>
    )
}

export default page
