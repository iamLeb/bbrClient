import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import UserContextProvider from "./context/UserContextProvider.jsx";
import GlobalContextProvider from "./context/GlobalContextProvider.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <UserContextProvider>
        <GlobalContextProvider>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </GlobalContextProvider>
    </UserContextProvider>
)
