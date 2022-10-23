import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { msalConfig } from './authConfig';
import { theme } from './theme';
import { ThemeProvider } from '@mui/material/styles';

const msalInstance = new PublicClientApplication(msalConfig);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <MsalProvider instance={msalInstance}>
        <App />
      </MsalProvider>
    </ThemeProvider>
  </React.StrictMode>
);
