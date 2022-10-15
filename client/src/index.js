import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import { JokesContextProvider } from './store/jokes-context';
import { AuthContextProvider } from './store/auth-context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <AuthContextProvider>
            <JokesContextProvider>
                <App />
            </JokesContextProvider>
        </AuthContextProvider>
    </BrowserRouter>
);
