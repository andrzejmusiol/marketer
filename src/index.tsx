import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/globals.css'
import { QueryProvider } from '@/app/query-provider';
import WeatherPage from '@/features/weather/pages';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryProvider>
            <WeatherPage />
        </QueryProvider>
    </React.StrictMode>
);

