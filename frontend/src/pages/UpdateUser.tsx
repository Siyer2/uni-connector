import {
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Button,
  FormControl,
} from '@mui/material';
import TopAppBar from '../components/TopAppBar';
import { useState } from 'react';
import { Faculty } from '../types';

export const UpdateUser = () => {
  const [userDetails, setUserDetails] = useState<{
    emojis: string;
    faculty: Faculty;
    faveEat: string;
    interests: string;
  }>({ emojis: '', faculty: Faculty.Business, faveEat: '', interests: '' });

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
    console.log(userDetails);
    // TODO:
    // Hit the correct API to successfully store info to the db
    const res = await fetch('http://localhost:3001/updateUser', {
      method: 'POST',
    });
    await res.json();
  };

  return (
    <TopAppBar>
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
            value={userDetails.emojis}
            placeholder={'😎 ⚽ 🍔'}
            name="emojis"
            label={'Describe yourself in 3 emojis!'}
            fullWidth
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
            label={"What's your favourite place to eat on campus?"}
            value={userDetails.faveEat}
            onChange={handleChange}
            name="bestEat"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label={"I'm into..."}
            value={userDetails.interests}
            placeholder={'hip-hop, Simpsons'}
            onChange={handleChange}
            name="interests"
            fullWidth
          />
        </Grid>
      </Grid>
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
        <Button variant={'contained'} onClick={handleSubmit}>
          Submit!
        </Button>
      </Grid>
    </TopAppBar>
  );
};
