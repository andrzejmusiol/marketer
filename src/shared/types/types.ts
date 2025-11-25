export type Coord = {
    lon: number
    lat: number
}

export type Weather = {
    id: number
    main: string
    description: string
    icon: string
}

export type Forecast = {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
    sea_level: number
    grnd_level: number
}

export type Wind = {
    speed: number
    deg: number
    gust: number
}

export type Clouds = {
    all: number
}

export type Location = {
    type: number
    id: number
    country: string
    sunrise: number
    sunset: number
}