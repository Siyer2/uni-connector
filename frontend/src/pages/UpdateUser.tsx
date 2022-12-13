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
import Background from '../components/Background';
import { useState } from 'react';
import { Faculty } from '../types';

export const UpdateUser = () => {
  const [userDetails, setUserDetails] = useState<{
    emojis: string;
    faculty: string;
    bestEat: string;
    interests: string;
  }>({ emojis: '', faculty: '', bestEat: '', interests: '' });

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
    <Background bgcolor={'#fff'}>
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
        <Typography variant={'h4'}>
          Let's get to know you <br /> ✌️😙✌️
        </Typography>
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
        <div style={{ width: '20rem' }}>
          <InputLabel sx={{ marginBottom: '8px' }}>
            Describe yourself in 3 emojis!
          </InputLabel>
          <TextField
            onChange={handleChange}
            value={userDetails.emojis}
            placeholder={'😎 ⚽ 🍔'}
            name="emojis"
            fullWidth
          />
        </div>
        <div style={{ width: '20rem' }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Choose your faculty
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
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
        </div>
        <div style={{ width: '20rem' }}>
          <InputLabel sx={{ marginBottom: '8px' }}>
            What's the best place to eat on campus?
          </InputLabel>
          <TextField
            value={userDetails.bestEat}
            placeholder={'Guzman y Gomez'}
            onChange={handleChange}
            name="bestEat"
            fullWidth
          />
        </div>
        <div style={{ width: '20rem' }}>
          <InputLabel sx={{ marginBottom: '8px' }}>I'm into...</InputLabel>
          <TextField
            value={userDetails.interests}
            placeholder={'hip-hop, Simpsons'}
            onChange={handleChange}
            name="interests"
            fullWidth
          />
        </div>
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
    </Background>
  );
};
