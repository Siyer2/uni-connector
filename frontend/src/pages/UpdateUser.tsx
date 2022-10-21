import { Box, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import { theme } from '../theme';

export const UpdateUser = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          bgcolor: theme.palette.background.default,
          color: theme.palette.primary.contrastText,
          height: '100vh',
        }}
      >
        <Typography variant="h1" textAlign={'center'}>
          Let's get to know you!
        </Typography>
        <Box
          sx={{
            fontSize: 30,
            textAlign: 'left',
            fontWeight: 'medium',
            mx: '70vh',
            py: '10vh',
          }}
        >
          <Box>What faculty are you in?</Box>
          <Box
            sx={{
              mb: '150px',
            }}
          >
            &lt;dropdownbox&gt;
          </Box>
          <Box>I'm into...</Box>
          <Box
            sx={{
              mb: '150px',
            }}
          >
            &lt;textbox&gt;
          </Box>
          <Box
            sx={{
              fontSize: 30,
              textAlign: 'center',
            }}
          >
            &lt;submit&gt;
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};
