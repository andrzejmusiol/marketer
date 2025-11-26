import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/globals.css'
import { QueryProvider } from '@/app/query-provider';
import ForecastPage from '@/features/forecast/pages/forescast';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryProvider>
            <ForecastPage />
        </QueryProvider>
    </React.StrictMode>
);

