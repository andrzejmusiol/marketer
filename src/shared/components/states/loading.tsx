import { Loader2 } from "lucide-react"

export const Loading = () => {
    return (
        <div className="flex items-center justify-center h-full">
            <Loader2 className="w-4 h-4 animate-spin" data-testid="loading-spinner" />
        </div>
    )
}