import React from 'react';
import ReactDOM from 'react-dom/client';
import ForescastPage from '@/features/forescast/pages/forescast';
import '@/index.css';
import { QueryProvider } from '@/app/query-provider';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryProvider>
            <ForescastPage />
        </QueryProvider>
    </React.StrictMode>
);

