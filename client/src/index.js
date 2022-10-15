import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import { JokesContextProvider } from './store/jokes-context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <JokesContextProvider>
            <App />
        </JokesContextProvider>
    </BrowserRouter>
);
