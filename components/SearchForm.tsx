
import Form from "next/form"
import { Search } from "lucide-react"

import SearchFormButton from "@/components/SearchFormButton"

function SearchForm({ query }: { query?: string }) {

    return (
        <Form action="/" scroll={false} className="search-form">
            <input
                name="query"
                defaultValue={query}
                className="search-input"
                placeholder="Search Startups" />

            <div className="flex gap-2">
                {query && <SearchFormButton />}

                <button
                    type="submit"
                    className="search-btn text-white">
                    <Search />
                </button>

            </div>
        </Form>
    )
}

export default SearchForm
