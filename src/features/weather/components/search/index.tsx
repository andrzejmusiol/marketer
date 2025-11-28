import { SearchCombobox } from "./search-combobox"
import { RecentSearches } from "./recent-searches"
import { Geocoding } from "@/shared/types/types"
import { FC } from "react"

type Props = {
    handleGeocodingSelect: (geocoding: Geocoding) => void
}

export const Search: FC<Props> = ({ handleGeocodingSelect }) => {
    return (
        <div>
            <SearchCombobox onGeocodingSelect={handleGeocodingSelect} />
            <RecentSearches onGeocodingSelect={handleGeocodingSelect} />
        </div>
    )
}