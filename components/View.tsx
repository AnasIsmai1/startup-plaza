import { client } from "@/sanity/lib/client";
import Ping from "./Ping"
import { sanityFetch } from "@/sanity/lib/live"
import { VIEW_QUERY } from "@/sanity/lib/queries"
import { writeclient } from "@/sanity/lib/write-client";
import { after } from "next/server"

async function View({ id }: { id: string }) {
    const params = { id: id || null }

    const view = await client.withConfig({ useCdn: false }).fetch(VIEW_QUERY, params);

    after(async () =>
        await writeclient
            .patch(id)
            .set({ views: view.views + 1 })
            .commit()
    )

    return (
        <div className="view-container">
            <div className="absolute -top-2 -right-2">
                <Ping />
            </div>

            <div className="view-text">
                <span className="font-black">{view.views} {view.views > 1 ? "Views" : "View"}</span>
            </div>
        </div>

    )
}

export default View
