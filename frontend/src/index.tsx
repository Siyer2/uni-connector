import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { msalConfig } from './authConfig';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#6db4ff',
      main: '#2185ef',
      dark: '#0059bc',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ffbb52',
      main: '#fe8a1e',
      dark: '#c55b00',
      contrastText: '#fff',
    },
    background: {
      default: '#2185ef',
    },
  },
  spacing: 8, // Every unit of spacing for margin/padding is 8px
});

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
