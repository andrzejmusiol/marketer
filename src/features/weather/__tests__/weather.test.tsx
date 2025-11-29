import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Weather } from '@/features/weather/components/index'
import { Weather as WeatherType } from '@/shared/types/types'
import { useGeocodingStore } from '@/shared/stores/geocoding'
import { useGeolocation } from '@/shared/hooks/use-geolocation'
import { useWeather } from '@/features/weather/hooks/use-weather'

vi.mock('@/shared/stores/geocoding', () => ({
    useGeocodingStore: vi.fn(),
}))

vi.mock('@/shared/hooks/use-geolocation', () => ({
    useGeolocation: vi.fn(),
}))

vi.mock('@/features/weather/hooks/use-weather', () => ({
    useWeather: vi.fn(),
}))

vi.mock('@/features/weather/components/search/initial-search', () => ({
    InitialSearch: () => <div data-testid="initial-search">Initial Search</div>,
}))

vi.mock('@/features/weather/components/search', () => ({
    Search: () => <div data-testid="search">Search Component</div>,
}))

vi.mock('@/features/weather/components/wheater-details', () => ({
    WeatherDetails: ({ weather }: { weather: WeatherType }) => (
        <div data-testid="weather-details">
            Weather Details for {weather.name}
        </div>
    ),
}))


const mockUseGeocodingStore = vi.mocked(useGeocodingStore)
const mockUseGeolocation = vi.mocked(useGeolocation)
const mockUseWeather = vi.mocked(useWeather)

const mockWeatherData: WeatherType = {
    coord: { lon: -1, lat: 51 },
    weather: [
        {
            id: 800,
            main: 'Clear',
            description: 'clear sky',
            icon: '01d',
        },
    ],
    base: 'stations',
    main: {
        temp: 15.5,
        feels_like: 14.2,
        temp_min: 12.0,
        temp_max: 18.0,
        pressure: 1013,
        humidity: 65,
        sea_level: 1013,
        grnd_level: 1000,
    },
    visibility: 10000,
    wind: { speed: 3.5, deg: 180, gust: 4.0 },
    clouds: { all: 0 },
    dt: 1704067200,
    sys: {
        type: 1,
        id: 1414,
        country: 'GB',
        sunrise: 1704012345,
        sunset: 1704045678,
    },
    timezone: 0,
    id: 2643743,
    name: 'London',
    cod: 200,
}

const mockGeocoding = {
    name: 'London',
    lat: 51,
    lon: -1,
    country: 'GB',
    state: 'England',
}

describe('Weather', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should render InitialSearch when weather is null', () => {
        mockUseGeocodingStore.mockReturnValue({ geocoding: null })
        mockUseGeolocation.mockReturnValue({ lat: null, lon: null, isLoading: false, error: null })
        mockUseWeather.mockReturnValue({
            weather: undefined,
            isWeatherLoading: false,
            weatherError: null,
        })

        render(<Weather />)

        expect(screen.getByTestId('initial-search')).toBeInTheDocument()
    })

    it('should render InitialSearch when weather is null and loading', () => {
        mockUseGeocodingStore.mockReturnValue({ geocoding: null })
        mockUseGeolocation.mockReturnValue({ lat: null, lon: null, isLoading: false, error: null })
        mockUseWeather.mockReturnValue({
            weather: undefined,
            isWeatherLoading: true,
            weatherError: null,
        })

        render(<Weather />)
        expect(screen.getByTestId('initial-search')).toBeInTheDocument()
    })

    it('should render Loading when weather exists but is being refetched', () => {
        mockUseGeocodingStore.mockReturnValue({ geocoding: null })
        mockUseGeolocation.mockReturnValue({ lat: null, lon: null, isLoading: false, error: null })
        mockUseWeather.mockReturnValue({
            weather: mockWeatherData,
            isWeatherLoading: true,
            weatherError: null,
        })

        render(<Weather />)
        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
    })

    it('should render Error when weather has an error', () => {
        const errorMessage = 'Failed to fetch weather data'
        mockUseGeocodingStore.mockReturnValue({ geocoding: null })
        mockUseGeolocation.mockReturnValue({ lat: null, lon: null, isLoading: false, error: null })
        mockUseWeather.mockReturnValue({
            weather: mockWeatherData,
            isWeatherLoading: false,
            weatherError: { message: errorMessage } as Error,
        })

        render(<Weather />)

        expect(screen.getByText(errorMessage)).toBeInTheDocument()
    })

    it('should render WeatherDetails and Search when weather data is available', () => {
        mockUseGeocodingStore.mockReturnValue({ geocoding: mockGeocoding })
        mockUseGeolocation.mockReturnValue({ lat: null, lon: null, isLoading: false, error: null })
        mockUseWeather.mockReturnValue({
            weather: mockWeatherData,
            isWeatherLoading: false,
            weatherError: null,
        })

        render(<Weather />)

        expect(screen.getByTestId('weather-details')).toBeInTheDocument()
        expect(screen.getByText(/Weather Details for London/)).toBeInTheDocument()
        expect(screen.getByTestId('search')).toBeInTheDocument()
    })

    it('should use geocoding coordinates when available', () => {
        mockUseGeocodingStore.mockReturnValue({ geocoding: mockGeocoding })
        mockUseGeolocation.mockReturnValue({ lat: 40, lon: -74, isLoading: false, error: null })
        mockUseWeather.mockReturnValue({
            weather: mockWeatherData,
            isWeatherLoading: false,
            weatherError: null,
        })

        render(<Weather />)

        expect(mockUseWeather).toHaveBeenCalledWith(51, -1)
    })

    it('should use geolocation coordinates when geocoding is not available', () => {
        mockUseGeocodingStore.mockReturnValue({ geocoding: null })
        mockUseGeolocation.mockReturnValue({ lat: 40, lon: -74, isLoading: false, error: null })
        mockUseWeather.mockReturnValue({
            weather: mockWeatherData,
            isWeatherLoading: false,
            weatherError: null,
        })

        render(<Weather />)

        expect(mockUseWeather).toHaveBeenCalledWith(40, -74)
    })

    it('should use default coordinates (0, 0) when neither geocoding nor geolocation is available', () => {
        mockUseGeocodingStore.mockReturnValue({ geocoding: null })
        mockUseGeolocation.mockReturnValue({ lat: null, lon: null, isLoading: false, error: null })
        mockUseWeather.mockReturnValue({
            weather: mockWeatherData,
            isWeatherLoading: false,
            weatherError: null,
        })

        render(<Weather />)

        expect(mockUseWeather).toHaveBeenCalledWith(0, 0)
    })

    it('should prioritize geocoding coordinates over geolocation', () => {
        mockUseGeocodingStore.mockReturnValue({ geocoding: mockGeocoding })
        mockUseGeolocation.mockReturnValue({ lat: 40, lon: -74, isLoading: false, error: null })
        mockUseWeather.mockReturnValue({
            weather: mockWeatherData,
            isWeatherLoading: false,
            weatherError: null,
        })

        render(<Weather />)

        expect(mockUseWeather).toHaveBeenCalledWith(51, -1)
        expect(mockUseWeather).not.toHaveBeenCalledWith(40, -74)
    })

    it('should pass geocoding to WeatherDetails when available', () => {
        mockUseGeocodingStore.mockReturnValue({ geocoding: mockGeocoding })
        mockUseGeolocation.mockReturnValue({ lat: null, lon: null, isLoading: false, error: null })
        mockUseWeather.mockReturnValue({
            weather: mockWeatherData,
            isWeatherLoading: false,
            weatherError: null,
        })

        render(<Weather />)

        expect(screen.getByTestId('weather-details')).toBeInTheDocument()
    })
})

