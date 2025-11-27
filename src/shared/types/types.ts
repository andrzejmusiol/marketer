export type Coord = {
    lon: number
    lat: number
}

export type WeatherDetails = {
    id: number
    main: string
    description: string
    icon: string
}

export type MainForecast = {
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

export type Weather = {
    coord: Coord
    weather: Array<WeatherDetails>
    base: string
    main: MainForecast
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

export type Geocoding = {
    name: string
    local_names?: Record<string, string>
    lat: number
    lon: number
    country: string
    state?: string
}

export type City = {
    id: number
    name: string
    coord: Coord
    country: string
    population: number
    timezone: number
    sunrise: number
    sunset: number
}

export type Forecast = {
    clouds: Clouds
    dt: number
    dt_txt: string
    main: MainForecast
    pop: number
    sys: {
        pod: string
    }
    visibility: number
    weather: Array<WeatherDetails>
    wind: Wind
}

export type HourlyForecast = {
    city: City
    cnt: number
    cod: string
    list: Array<Forecast>
    message: number
}