import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import JokesProvider from './store/JokesProvider';
import AuthProvider from './store/AuthProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <AuthProvider>
            <JokesProvider>
                <App />
            </JokesProvider>
        </AuthProvider>
    </BrowserRouter>
);
