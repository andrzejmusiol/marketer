import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/globals.css'
import { QueryProvider } from '@/app/providers/query-provider';
import { WeatherForecastPage } from './app/views';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryProvider>
            <WeatherForecastPage />
        </QueryProvider>
    </React.StrictMode>
);

