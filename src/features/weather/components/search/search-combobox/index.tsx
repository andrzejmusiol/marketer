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
import { Geocoding } from "@/shared/types/types"
import { useGeocoding } from "@/features/weather/hooks/use-geocoding"
import { useDebounce } from "@/shared/hooks/use-debounce"
import { PopoverTrigger } from "@radix-ui/react-popover"
import { useRecentSearches } from "@/features/weather/hooks/use-recent-search"
import { geocodingKeyFactory } from "@/features/weather/utils/factories"
import { Loading } from "@/shared/components/states/loading"
import { Error } from "@/shared/components/states/error"
import { Search } from "lucide-react"
import { useGeocodingStore } from "@/shared/stores/geocoding"

export const SearchCombobox = () => {
    const { setGeocoding } = useGeocodingStore()
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")
    const debouncedValue = useDebounce(value, 500)
    const { geocoding, isLoading, error } = useGeocoding(debouncedValue);
    const { addRecentSearch } = useRecentSearches()

    useEffect(() => debouncedValue.length >= 2 && (geocoding.length > 0 || isLoading) ? setOpen(true) : setOpen(false)
        , [debouncedValue, geocoding.length, isLoading])

    if (error) return <Error message={error.message} />

    const handleSelect = (geocoding: Geocoding) => {
        setValue(geocoding.name)
        setOpen(false)
        addRecentSearch(geocoding)
        setGeocoding(geocoding)
    }

    return (
        <Popover open={open} onOpenChange={setOpen} modal={false}>
            <PopoverTrigger asChild>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    <Input
                        className="pl-10 bg-white/1 text-white rounded-full border-white/10"
                        placeholder="Search city..."
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                </div>
            </PopoverTrigger>
            <PopoverContent
                className="w-[var(--radix-popover-trigger-width)] p-0 bg-white/1 border-white/10"
                align="start"
                onOpenAutoFocus={(e) => e.preventDefault()}
            >
                <Command shouldFilter={false} className="text-white bg-white/10 backdrop-blur-md border-white/10">
                    <CommandList>
                        {isLoading ? <Loading /> : geocoding.length === 0 ? (
                            <CommandEmpty>Search for cities...</CommandEmpty>
                        ) : (
                            <CommandGroup>
                                {geocoding.map((geo) => (
                                    <CommandItem
                                        key={geocodingKeyFactory(geo)}
                                        value={`${geo.name}-${geo.state}-${geo.country}`}
                                        onSelect={() => handleSelect(geo)}
                                        className="data-[selected=true]:bg-white/5 my-1 cursor-pointer"
                                    >
                                        <div className="flex flex-col">
                                            <span className="text-white">{geo.name}</span>
                                            <span className="text-xs text-white/50">
                                                {geo.state && `${geo.state}, `}{geo.country}
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