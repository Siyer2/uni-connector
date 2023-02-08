import {
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Button,
  FormControl,
  Backdrop,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material';
import TopAppBar from '../components/TopAppBar';
import { useState } from 'react';
import { Faculty, UserDetails } from '../types';
import { updateUser } from '../api';
import { useNavigate, useLocation } from 'react-router-dom';

export const UpdateUser = () => {
  const { state } = useLocation();
  const { user } = state;
  const [userDetails, setUserDetails] = useState<UserDetails>({
    name: user.name,
    faculty: Faculty.Business,
    interests: user.interests || '',
  });
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [loginErrorMsg, setUpdateErrorMsg] = useState('');

  const navigate = useNavigate();

  // TODO:
  // Add appropriate type to event
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const updatedUser = await updateUser(userDetails);
      setLoading(false);
      navigate('/chats', { state: { user: updatedUser } });
    } catch (err: any) {
      setLoading(false);
      if (err.response) {
        setUpdateErrorMsg(err.response.data);
        setOpen(true);
      } else {
        setUpdateErrorMsg(err.message);
        setOpen(true);
      }
    }
  };

  return (
    <TopAppBar>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid
        item
        xs={12}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant={'h5'}>This is...</Typography>
        <Typography variant={'h2'}>TuesHey</Typography>
        <Typography variant={'h4'}>Let's get to know you</Typography>
        <Typography variant={'h4'}>✌️😙✌️</Typography>
      </Grid>
      <Grid item container xs={12} paddingX={5} style={{ gap: 15 }}>
        <Grid item xs={12}>
          <TextField
            onChange={handleChange}
            value={userDetails.name}
            placeholder={'John Smith'}
            name="name"
            label={"What's your name?"}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth required>
            <InputLabel>Choose your faculty</InputLabel>
            <Select
              value={userDetails.faculty}
              label="Choose your faculty"
              onChange={handleChange}
              name="faculty"
            >
              <MenuItem value={Faculty.ArtsDesignAndArchitecture}>
                Arts, Design & Architecture
              </MenuItem>
              <MenuItem value={Faculty.Business}>Business School</MenuItem>
              <MenuItem value={Faculty.Engineering}>Engineering</MenuItem>
              <MenuItem value={Faculty.LawAndJustice}>Law and Justice</MenuItem>
              <MenuItem value={Faculty.MedicineAndHealth}>
                Medicine and Health
              </MenuItem>
              <MenuItem value={Faculty.Science}>Science</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label={"I'm into..."}
            value={userDetails.interests}
            placeholder={'hip-hop, Simpsons'}
            onChange={handleChange}
            name="interests"
            fullWidth
            required
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            variant={'contained'}
            onClick={handleSubmit}
            disabled={!userDetails.name || !userDetails.interests}
          >
            Submit!
          </Button>
        </Grid>
      </Grid>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity="error"
          sx={{ width: '100%' }}
          variant="filled"
        >
          {loginErrorMsg}
        </Alert>
      </Snackbar>
    </TopAppBar>
  );
};
