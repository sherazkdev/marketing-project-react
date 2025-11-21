import { StrictMode } from 'react';
import { BrowserRouter } from "react-router-dom";
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

// Providers
import { AuthProvider } from './contexts/AuthProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
