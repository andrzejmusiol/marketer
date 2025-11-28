import { FC, ReactNode } from "react"

type Props = {
    children: ReactNode
}
export const Empty: FC<Props> = ({ children }) =>
    <div className="flex items-center justify-center h-full">
        {children}
    </div>