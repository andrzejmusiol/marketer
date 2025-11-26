import { useState, useEffect } from "react"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList,
} from "@/shared/components/ui/command"
import {
    Popover,
    PopoverContent,
} from "@/shared/components/ui/popover"
import { Input } from "@/shared/components/ui/input"
import { FC } from "react"
import { Geocoding } from "@/shared/types/types"
import { useCity } from "@/features/forecast/hooks/use-city"
import { useDebounce } from "@/shared/hooks/use-debounce"
import { PopoverTrigger } from "@radix-ui/react-popover"
import { useRecentSearches } from "@/features/forecast/hooks/user-recent-search"
import { RecentSearches } from "@/features/forecast/components/search/recent-search"
import { generateCityKey } from "@/features/forecast/utils/utils"

type Props = {
    onCitySelect?: (city: Geocoding) => void
}

export const SearchCombobox: FC<Props> = ({ onCitySelect }) => {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")
    const debouncedValue = useDebounce(value, 500)
    const { cities, isLoading, error } = useCity(debouncedValue);
    const { recentSearches, addRecentSearch } = useRecentSearches()

    useEffect(() => debouncedValue.length >= 2 && (cities.length > 0 || isLoading) ? setOpen(true) : setOpen(false)
        , [debouncedValue, cities.length, isLoading])

    useEffect(() => {
        if (value.length === 0 && recentSearches.length > 0) {
            setOpen(true)
        }
    }, [value.length, recentSearches.length])

    if (error) {
        return <div className="text-red-500">{error.message}</div>
    }

    const handleSelect = (city: Geocoding) => {
        setValue(city.name)
        setOpen(false)
        addRecentSearch(city)
        onCitySelect?.(city)
    }

    return (
        <Popover open={open} onOpenChange={setOpen} modal={false}>
            <PopoverTrigger asChild>
                <div className="relative">
                    <Input
                        placeholder="Search city..."
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                </div>
            </PopoverTrigger>
            <PopoverContent
                className="w-[var(--radix-popover-trigger-width)] p-0"
                align="start"
                onOpenAutoFocus={(e) => e.preventDefault()}
            >
                <Command shouldFilter={false}>
                    <CommandList>
                        <RecentSearches handleSelect={handleSelect} />
                        {isLoading ? (
                            <div className="py-6 text-center text-sm text-muted-foreground">
                                Loading...
                            </div>
                        ) : cities.length === 0 ? (
                            <CommandEmpty>No cities found.</CommandEmpty>
                        ) : (
                            <CommandGroup>
                                {cities.map((city) => (
                                    <CommandItem
                                        key={generateCityKey(city)}
                                        value={`${city.name}-${city.state}-${city.country}`}
                                        onSelect={() => handleSelect(city)}
                                    >
                                        <div className="flex flex-col">
                                            <span>{city.name}</span>
                                            <span className="text-xs text-muted-foreground">
                                                {city.state && `${city.state}, `}{city.country}
                                            </span>
                                        </div>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}