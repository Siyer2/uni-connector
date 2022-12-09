import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
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
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#2185ef',
        },
      },
    },
  },
});
