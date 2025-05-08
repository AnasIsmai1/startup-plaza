import { client } from "@/sanity/lib/client"
import { STARTUPS_BY_USER_ID_QUERY } from "@/sanity/lib/queries"
import StartupCard, { StartupCardSkeleton, StartUpCardType } from "./StartupCard"
import { Suspense } from "react"
import { Skeleton } from "./ui/skeleton"

async function UserStartups({ id }: { id: string }) {
    const startups = await client.fetch(STARTUPS_BY_USER_ID_QUERY, { id })

    return (
        <ul className="card_grid-sm">
            <Suspense fallback={<StartupCardSkeleton />}>
                {startups?.length > 0 ? (
                    startups.map((startup: StartUpCardType) => (
                        <StartupCard post={startup} key={startup?._id} />
                    ))
                ) : (
                    <p className="no-result">No startups found</p>
                )}
            </Suspense>
        </ul >
    )
}

export default UserStartups
