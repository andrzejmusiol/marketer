import { ReactNode } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/shared/configs/query'

interface QueryProviderProps {
    children: ReactNode
}

export const QueryProvider = ({ children }: QueryProviderProps) =>
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
