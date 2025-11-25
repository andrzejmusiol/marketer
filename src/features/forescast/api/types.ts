import { Clouds, Coord, Forecast, Location, Weather, Wind } from "@/shared/types/types"

export type WeatherResponse = {
  coord: Coord
  weather: Array<Weather>
  base: string
  main: Forecast
  visibility: number
  wind: Wind
  clouds: Clouds
  dt: number
  sys: Location
  timezone: number
  id: number
  name: string
  cod: number
}