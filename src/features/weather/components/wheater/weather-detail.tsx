import { FC } from "react"

type Props = {
    detail: string
}

export const WeatherDetail: FC<Props> = ({ detail }) => <div className="text-lg m-2 border border-white/10 bg-white/5 text-center rounded-full px-3 py-1">{detail}</div>
