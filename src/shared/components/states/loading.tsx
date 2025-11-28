import { Loader2 } from "lucide-react"

export const Loading = () => {
    return (
        <div className="flex items-center justify-center h-full">
            <Loader2 className="w-4 h-4 animate-spin text-white w-10 h-10" data-testid="loading-spinner" />
        </div>
    )
}