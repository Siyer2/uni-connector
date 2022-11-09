import {
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { ThemeProvider } from '@mui/system';
import { theme } from '../theme';

// Functionality and then appearance

// TODO: change on select
let facultyId: number = -1;

export const UpdateUser = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          bgcolor: theme.palette.background.default,
          color: theme.palette.primary.contrastText,
          height: '100vh',
          textAlign: 'center',
        }}
      >
        <Typography variant="h1">Let's get to know you!</Typography>
        <Grid
          container
          spacing={8}
          sx={{
            fontSize: 30,
            flexDirection: 'column',
            fontWeight: 'medium',
          }}
        >
          {/* TODO: Make fields required */}
          <Grid item>
            {/* Change facultyId on event */}
            <Box>What faculty are you in?</Box>
            <Select label="Age">
              <MenuItem value={0}>Arts, Design & Architecture</MenuItem>
              <MenuItem value={1}>Business</MenuItem>
              <MenuItem value={2}>Engineering</MenuItem>
              <MenuItem value={3}>Law</MenuItem>
              <MenuItem value={4}>Medicine</MenuItem>
              <MenuItem value={5}>Science</MenuItem>
            </Select>
          </Grid>
          <Grid item>
            <Box>I'm into...</Box>
            {/* TODO: Take information from input*/}
            <TextField label="Write something" />
          </Grid>
          <Grid item>
            {/* TODO: Submit inputted information */}
            <Button variant="contained">Submit</Button>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};
