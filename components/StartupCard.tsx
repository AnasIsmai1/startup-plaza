import { EyeIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { Author, Startup } from "@/sanity/types";
import { Skeleton } from "./ui/skeleton";
import { cn } from "@/lib/utils";

export type StartUpCardType = Omit<Startup, "author"> & { author?: Author }

function StartupCard({ post }: { post: StartUpCardType }) {
    return (
        <li className="startup-card group">
            <div className="flex-between">
                <p className="startup_card_date">
                    {formatDate(post._createdAt)}
                </p>
                <p className="flex gap-1.5">
                    <EyeIcon className="size-6 text-primary" />
                    <span>{post.views}</span>
                </p>
            </div>
            <div className="flex-between gap-5 mt-5">
                <div className="flex-1">
                    <Link href={`/user/${post?.author?._id}`}>
                        <p className="text-16-medium line-clamp-1">
                            {post.author?.name}
                        </p>
                    </Link>
                    <Link href={`/startup/${post._id}`}>
                        <h3 className="text-26-semibold line-clamp-2">
                            {post.title}
                        </h3>
                    </Link>
                </div>
                <Link href={`/user/${post?.author?._id}`}>
                    <Image src={post?.author?.image} alt={post?.author?.name} className="rounded-full" width={48} height={48} />
                </Link>

            </div>
            <Link href={`/startup/${post?.author?._id}`} >
                <p className="startup-card_desc">
                    {post.description}
                </p>

                <img src={post.image} alt={post.title} className="startup-card_img" />
            </Link>

            <div className="flex-between gap-3 mt-5">
                <Link href={`?query=${post?.category?.toLowerCase()}`}>
                    <p className="text-16-medium">
                        {post.category}
                    </p>
                </Link>
                <Button className="startup-card_btn" variant="outline" size="sm">
                    <Link href={`/startup/${post._id}`}>
                        Details
                    </Link>
                </Button>
            </div>
        </li>
    )
}

export const StartupCardSkeleton = () => {
    return (
        <>
            {Array.from({ length: 5 }).map((_, index) => (
                <li key={cn("skeleton", index)}>
                    <Skeleton className="startup_card-skeleton" />
                </li>
            ))}
        </>
    )

}
export default StartupCard
