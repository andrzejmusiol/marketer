import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Forecast } from '../components/forecast'
import { ForecastList } from '@/shared/types/types'

// Mock dependencies
vi.mock('@/shared/stores/geocoding', () => ({
    useGeocodingStore: vi.fn(),
}))

vi.mock('@/shared/api/use-geolocation', () => ({
    useGeolocation: vi.fn(),
}))

vi.mock('@/features/forecast/hooks/use-forecast', () => ({
    useForecast: vi.fn(),
}))

vi.mock('@/features/forecast/components/forecast-chart', () => ({
    ForecastChart: ({ forecast }: { forecast: ForecastList }) => (
        <div data-testid="forecast-chart">
            Forecast Chart with {forecast.length} items
        </div>
    ),
}))

import { useGeocodingStore } from '@/shared/stores/geocoding'
import { useGeolocation } from '@/shared/api/use-geolocation'
import { useForecast } from '@/features/forecast/hooks/use-forecast'

const mockUseGeocodingStore = vi.mocked(useGeocodingStore)
const mockUseGeolocation = vi.mocked(useGeolocation)
const mockUseForecast = vi.mocked(useForecast)

const mockForecastData: ForecastList = [
    {
        dt: 1704067200,
        dt_txt: '2024-01-01 12:00:00',
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
        weather: [
            {
                id: 800,
                main: 'Clear',
                description: 'clear sky',
                icon: '01d',
            },
        ],
        clouds: { all: 0 },
        wind: { speed: 3.5, deg: 180, gust: 4.0 },
        visibility: 10000,
        pop: 0,
        sys: { pod: 'd' },
    },
    {
        dt: 1704078000,
        dt_txt: '2024-01-01 15:00:00',
        main: {
            temp: 17.2,
            feels_like: 16.0,
            temp_min: 14.0,
            temp_max: 20.0,
            pressure: 1012,
            humidity: 60,
            sea_level: 1012,
            grnd_level: 999,
        },
        weather: [
            {
                id: 801,
                main: 'Clouds',
                description: 'few clouds',
                icon: '02d',
            },
        ],
        clouds: { all: 20 },
        wind: { speed: 4.0, deg: 200, gust: 4.5 },
        visibility: 10000,
        pop: 0.1,
        sys: { pod: 'd' },
    },
]

describe('Forecast', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should render loading state when forecast is loading', () => {
        mockUseGeocodingStore.mockReturnValue({ geocoding: null })
        mockUseGeolocation.mockReturnValue({ lat: null, lon: null, isLoading: false, error: null })
        mockUseForecast.mockReturnValue({
            forecast: [],
            isForecastLoading: true,
            forecastError: null,
        })

        render(<Forecast />)

        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
    })

    it('should render error state when forecast has an error', () => {
        const errorMessage = 'Failed to fetch forecast data'
        mockUseGeocodingStore.mockReturnValue({ geocoding: null })
        mockUseGeolocation.mockReturnValue({ lat: null, lon: null, isLoading: false, error: null })
        mockUseForecast.mockReturnValue({
            forecast: [],
            isForecastLoading: false,
            forecastError: { message: errorMessage } as Error,
        })

        render(<Forecast />)

        expect(screen.getByText(errorMessage)).toBeInTheDocument()
    })

    it('should render ForecastChart with empty array when forecast is empty', () => {
        mockUseGeocodingStore.mockReturnValue({ geocoding: null })
        mockUseGeolocation.mockReturnValue({ lat: null, lon: null, isLoading: false, error: null })
        mockUseForecast.mockReturnValue({
            forecast: [],
            isForecastLoading: false,
            forecastError: null,
        })

        render(<Forecast />)
        expect(screen.getByTestId('forecast-chart')).toBeInTheDocument()
        expect(screen.getByText(/Forecast Chart with 0 items/)).toBeInTheDocument()
    })

    it('should render ForecastChart when forecast data is available', () => {
        mockUseGeocodingStore.mockReturnValue({ geocoding: null })
        mockUseGeolocation.mockReturnValue({ lat: null, lon: null, isLoading: false, error: null })
        mockUseForecast.mockReturnValue({
            forecast: mockForecastData,
            isForecastLoading: false,
            forecastError: null,
        })

        render(<Forecast />)

        expect(screen.getByTestId('forecast-chart')).toBeInTheDocument()
        expect(screen.getByText(/Forecast Chart with 2 items/)).toBeInTheDocument()
    })

    it('should use geocoding coordinates when available', () => {
        const mockGeocoding = {
            name: 'London',
            lat: 51,
            lon: -1,
            country: 'GB',
        }

        mockUseGeocodingStore.mockReturnValue({ geocoding: mockGeocoding })
        mockUseGeolocation.mockReturnValue({ lat: 40, lon: -74, isLoading: false, error: null })
        mockUseForecast.mockReturnValue({
            forecast: mockForecastData,
            isForecastLoading: false,
            forecastError: null,
        })

        render(<Forecast />)

        expect(mockUseForecast).toHaveBeenCalledWith(51, -1)
    })

    it('should use geolocation coordinates when geocoding is not available', () => {
        mockUseGeocodingStore.mockReturnValue({ geocoding: null })
        mockUseGeolocation.mockReturnValue({ lat: 40, lon: -74, isLoading: false, error: null })
        mockUseForecast.mockReturnValue({
            forecast: mockForecastData,
            isForecastLoading: false,
            forecastError: null,
        })

        render(<Forecast />)

        expect(mockUseForecast).toHaveBeenCalledWith(40, -74)
    })

    it('should use default coordinates (0, 0) when neither geocoding nor geolocation is available', () => {
        mockUseGeocodingStore.mockReturnValue({ geocoding: null })
        mockUseGeolocation.mockReturnValue({ lat: null, lon: null, isLoading: false, error: null })
        mockUseForecast.mockReturnValue({
            forecast: mockForecastData,
            isForecastLoading: false,
            forecastError: null,
        })

        render(<Forecast />)

        expect(mockUseForecast).toHaveBeenCalledWith(0, 0)
    })

    it('should prioritize geocoding coordinates over geolocation', () => {
        const mockGeocoding = {
            name: 'Paris',
            lat: 48,
            lon: 2,
            country: 'FR',
        }

        mockUseGeocodingStore.mockReturnValue({ geocoding: mockGeocoding })
        mockUseGeolocation.mockReturnValue({ lat: 40, lon: -74, isLoading: false, error: null })
        mockUseForecast.mockReturnValue({
            forecast: mockForecastData,
            isForecastLoading: false,
            forecastError: null,
        })

        render(<Forecast />)

        expect(mockUseForecast).toHaveBeenCalledWith(48, 2)
        expect(mockUseForecast).not.toHaveBeenCalledWith(40, -74)
    })
})

